import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (installed app)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      return; // Already installed & running as PWA
    }

    // Check if user dismissed prompt recently
    const isDismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (isDismissed) {
      return;
    }

    // Check if iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    
    if (isIosDevice) {
      setIsIOS(true);
      setShowBanner(true);
      return;
    }

    // Listen for Chrome/Android install prompt
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show native browser install prompt
    deferredPrompt.prompt();

    const { outcome } = await deferredPrompt.userChoice;
    console.log(`[PWA] Install prompt outcome: ${outcome}`);

    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleDismiss = () => {
    setShowBanner(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-bounce-short">
      <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white p-4 rounded-2xl shadow-2xl border border-cyan-400/30 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-md flex-shrink-0">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide">Install Doctors Portal App</h4>
            {isIOS ? (
              <p className="text-xs text-cyan-100 mt-0.5">
                Tap <span className="font-semibold underline">Share</span> &amp; select{' '}
                <span className="font-semibold underline">&quot;Add to Home Screen&quot;</span>
              </p>
            ) : (
              <p className="text-xs text-cyan-100 mt-0.5">
                Install as a mobile app for fast offline access!
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstallClick}
              className="bg-white text-cyan-700 font-semibold px-3.5 py-1.5 rounded-xl text-xs shadow-md hover:bg-cyan-50 transition active:scale-95 whitespace-nowrap"
            >
              Install
            </button>
          )}

          <button
            onClick={handleDismiss}
            aria-label="Close install prompt"
            className="p-1.5 hover:bg-white/20 rounded-lg text-cyan-100 hover:text-white transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAInstallPrompt;
