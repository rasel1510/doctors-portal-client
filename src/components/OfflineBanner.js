import React, { useState, useEffect, useCallback } from 'react';
import { offlineSync } from '../utils/offlineSync';
import { toast } from 'react-toastify';
import { Wifi, WifiOff, RefreshCw, CloudOff } from 'lucide-react';

const OfflineBanner = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingCount, setPendingCount] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showReconnectedBadge, setShowReconnectedBadge] = useState(false);

  const updateQueueCount = useCallback(async () => {
    const queue = await offlineSync.getQueue();
    setPendingCount(queue.length);
  }, []);

  const triggerSync = useCallback(async () => {
    if (!navigator.onLine || isSyncing) return;

    const currentQueue = await offlineSync.getQueue();
    if (currentQueue.length === 0) return;

    setIsSyncing(true);
    toast.info('🔄 Network restored! Syncing offline bookings...', { autoClose: 3000 });

    const result = await offlineSync.syncAll((item) => {
      if (item.type === 'BOOKING') {
        toast.success(`✅ Synced appointment for ${item.body.treatment} on ${item.body.date}!`);
      }
    });

    setIsSyncing(false);
    updateQueueCount();

    if (result.count > 0) {
      // Trigger a window reload event or query invalidate so UI updates
      window.dispatchEvent(new Event('app-data-synced'));
    }
  }, [isSyncing, updateQueueCount]);

  useEffect(() => {
    updateQueueCount();

    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnectedBadge(true);
      setTimeout(() => setShowReconnectedBadge(false), 4000);
      triggerSync();
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowReconnectedBadge(false);
      toast.warning('📶 You are offline. Changes will be saved locally & synced later.', { autoClose: 4000 });
    };

    const handleQueueChange = () => {
      updateQueueCount();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    window.addEventListener('offline-queue-changed', handleQueueChange);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('offline-queue-changed', handleQueueChange);
    };
  }, [triggerSync, updateQueueCount]);

  // Don't render anything if online and no items pending and not showing reconnect badge
  if (isOnline && pendingCount === 0 && !showReconnectedBadge) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 left-4 md:left-auto md:right-6 z-50 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
      {/* Reconnected Badge */}
      {isOnline && showReconnectedBadge && pendingCount === 0 && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 rounded-2xl shadow-xl border border-emerald-400/40 flex items-center gap-2.5 text-xs font-semibold backdrop-blur-md">
          <Wifi className="w-4 h-4 text-emerald-200 animate-pulse" />
          <span>Back online! Connection restored.</span>
        </div>
      )}

      {/* Offline Status / Pending Outbox Banner */}
      {(!isOnline || pendingCount > 0) && (
        <div className="bg-slate-900/95 text-white p-3.5 px-4 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center justify-between gap-3 backdrop-blur-lg max-w-md">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl flex-shrink-0 ${!isOnline ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'}`}>
              {!isOnline ? (
                <WifiOff className="w-5 h-5" />
              ) : (
                <CloudOff className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="text-xs font-bold tracking-wide text-slate-100">
                  {!isOnline ? 'Offline Mode Active' : 'Offline Changes Pending'}
                </h5>
                {pendingCount > 0 && (
                  <span className="bg-amber-500 text-slate-950 font-extrabold text-[10px] px-1.5 py-0.5 rounded-full">
                    {pendingCount}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-tight">
                {!isOnline
                  ? 'Browsing cached data. Bookings will queue locally.'
                  : `${pendingCount} offline action${pendingCount > 1 ? 's' : ''} ready to sync.`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {isOnline && pendingCount > 0 && (
              <button
                onClick={triggerSync}
                disabled={isSyncing}
                className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md transition disabled:opacity-50 active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                {isSyncing ? 'Syncing...' : 'Sync Now'}
              </button>
            )}

            {!isOnline && (
              <span className="flex items-center gap-1 text-[10px] text-amber-400/90 bg-amber-950/60 px-2 py-1 rounded-lg border border-amber-500/20 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                Offline
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OfflineBanner;
