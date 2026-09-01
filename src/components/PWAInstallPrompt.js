import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = ({ triggerOnHome = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Clear old storage keys from previous version to avoid blocking
    localStorage.removeItem('pwa_prompt_dismissed');
    sessionStorage.removeItem('pwa_modal_shown');

    // Never show if already running as installed PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) return;

    // Detect iOS
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true);

    // Capture Chrome/Android install prompt
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show modal on home page — once per session
    if (triggerOnHome) {
      const shownThisSession = sessionStorage.getItem('pwa_v2_shown');
      if (!shownThisSession) {
        const timer = setTimeout(() => {
          setShowModal(true);
          sessionStorage.setItem('pwa_v2_shown', '1');
        }, 1200);
        return () => {
          clearTimeout(timer);
          window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowModal(false);
  };

  const handleClose = () => setShowModal(false);

  const handleNeverShow = () => {
    setShowModal(false);
    // Use session-only flag for "not now" feel, but mark as seen permanently
    localStorage.setItem('pwa_v2_dismissed', '1');
  };

  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(2, 6, 23, 0.70)', backdropFilter: 'blur(6px)' }}
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{
          animation: 'pwaIn 0.4s cubic-bezier(0.22,1,0.36,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="px-6 pt-8 pb-7 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)' }}
        >
          {/* App icon */}
          <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-white/25 flex items-center justify-center shadow-lg">
            <svg className="w-9 h-9" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 2v20M2 12h20" />
              <rect x="7" y="7" width="10" height="10" rx="2"
                fill="white" fillOpacity="0.2" stroke="none" />
            </svg>
          </div>
          <h2 className="text-xl font-extrabold tracking-tight leading-tight mb-2">
            Install MediCare Pro
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Add to your home screen for fast, offline-ready access to appointments, doctors & health records.
          </p>
        </div>

        {/* Body */}
        <div className="bg-white px-6 pb-6 pt-5 space-y-4">

          {/* Feature list */}
          <ul className="grid grid-cols-1 gap-2">
            {[
              { icon: '⚡', label: 'Lightning-fast & works offline' },
              { icon: '📅', label: 'Book specialist appointments instantly' },
              { icon: '🧾', label: 'View invoices & medical history' },
              { icon: '🔔', label: 'Health appointment reminders' },
            ].map(({ icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-lg leading-none">{icon}</span>
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>

          {/* iOS instruction */}
          {isIOS && (
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-3.5 text-xs text-sky-900 leading-relaxed">
              <p className="font-bold mb-1">📱 To install on iPhone / iPad:</p>
              <p>
                Tap the <strong>Share</strong> button{' '}
                <span className="inline-block border border-sky-400 rounded px-1 font-mono">⬆</span>{' '}
                in Safari, then select <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          )}

          {/* Android / Desktop — native install button */}
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="w-full h-12 rounded-2xl font-bold text-sm text-white shadow-md transition-all active:scale-[0.97]"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0284C7)' }}
            >
              📲 Install App Now
            </button>
          )}

          {/* Android / Desktop — no native prompt yet (manual instructions) */}
          {!isIOS && !deferredPrompt && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs text-slate-700 leading-relaxed">
              <p className="font-bold mb-1">📲 How to install:</p>
              <p>
                Open in <strong>Chrome</strong>, tap the menu <strong>(⋮)</strong>, then choose{' '}
                <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2.5 pt-1">
            <button
              onClick={handleClose}
              className="flex-1 h-11 rounded-2xl border-2 border-teal-500 text-teal-700 text-sm font-bold hover:bg-teal-50 transition active:scale-[0.98]"
            >
              Not Now
            </button>
            <button
              onClick={handleNeverShow}
              className="flex-1 h-11 rounded-2xl border border-slate-200 text-slate-400 text-xs font-medium hover:bg-slate-50 transition"
            >
              Don't Ask Again
            </button>
          </div>
        </div>

        {/* Close X button */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/25 hover:bg-white/40 flex items-center justify-center text-white transition"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes pwaIn {
          from { opacity: 0; transform: scale(0.85) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PWAInstallPrompt;
