import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = ({ triggerOnHome = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Already installed as PWA — never show
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) {
      setInstalled(true);
      return;
    }

    // Check iOS
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    if (isIosDevice) setIsIOS(true);

    // Listen for Chrome/Android native install event
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Auto-show modal when landing on home page (once per session)
    if (triggerOnHome) {
      const alreadyShown = sessionStorage.getItem('pwa_modal_shown');
      const permanentlyDismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!alreadyShown && !permanentlyDismissed) {
        // Small delay so the page content loads first
        const timer = setTimeout(() => {
          setShowModal(true);
          sessionStorage.setItem('pwa_modal_shown', 'true');
        }, 1500);
        return () => {
          clearTimeout(timer);
          window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, [triggerOnHome]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setDeferredPrompt(null);
    setShowModal(false);
  };

  // "Not now" — hides for this session only
  const handleLater = () => {
    setShowModal(false);
  };

  // "Don't show again" — persists across sessions
  const handleNeverShow = () => {
    setShowModal(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (!showModal || installed) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(4px)' }}
      onClick={handleLater}
    >
      {/* Modal card — stop click propagation so backdrop click doesn't interfere with inner buttons */}
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{ animation: 'pwaModalIn 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gradient header */}
        <div
          className="px-6 pt-8 pb-6 text-white text-center"
          style={{ background: 'linear-gradient(135deg, #0D9488 0%, #0891B2 100%)' }}
        >
          {/* App icon */}
          <div className="mx-auto mb-4 w-16 h-16 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg">
            <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 3H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2h-2M9 3a1 1 0 011-1h4a1 1 0 011 1v1H9V3zM12 12v4m0 0l-2-2m2 2l2-2" />
            </svg>
          </div>

          <h2 className="text-xl font-extrabold tracking-tight mb-1">Install MediCare Pro</h2>
          <p className="text-sm text-teal-100 leading-relaxed">
            Get the full app experience — fast, offline-ready, and always one tap away on your home screen.
          </p>
        </div>

        {/* Body */}
        <div className="bg-white px-6 pb-6 pt-5 space-y-4">

          {/* Feature bullets */}
          <ul className="space-y-2.5">
            {[
              { icon: '⚡', text: 'Lightning-fast offline access' },
              { icon: '📅', text: 'Book appointments in seconds' },
              { icon: '🔔', text: 'Instant health reminders' },
              { icon: '📋', text: 'View invoices & medical history' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-slate-700">
                <span className="text-base">{icon}</span>
                <span className="font-medium">{text}</span>
              </li>
            ))}
          </ul>

          {/* iOS instructions */}
          {isIOS && (
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-3 text-xs text-teal-800 leading-relaxed">
              <p className="font-bold mb-1">📱 How to install on iOS:</p>
              <p>
                Tap the <strong>Share</strong> button (
                <span className="inline-block border border-teal-400 rounded px-1">⬆</span>
                ) at the bottom of Safari, then select{' '}
                <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          )}

          {/* Install button (Android / Desktop) */}
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="w-full h-12 rounded-2xl font-bold text-sm text-white shadow-md transition-all active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #0D9488, #0891B2)' }}
            >
              📲 Install App Now
            </button>
          )}

          {/* If Android but prompt not ready yet (e.g. already visited) — still show instructions */}
          {!isIOS && !deferredPrompt && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 text-xs text-slate-600 leading-relaxed">
              <p className="font-bold mb-1">📲 How to install:</p>
              <p>
                Open this site in <strong>Chrome</strong>, tap the browser menu (⋮), and select{' '}
                <strong>"Add to Home Screen"</strong> or <strong>"Install App"</strong>.
              </p>
            </div>
          )}

          {/* Action row */}
          <div className="flex gap-2 pt-1">
            <button
              onClick={handleLater}
              className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition"
            >
              Not Now
            </button>
            <button
              onClick={handleNeverShow}
              className="flex-1 h-10 rounded-xl border border-slate-200 text-slate-400 text-xs font-medium hover:bg-slate-50 transition"
            >
              Don't Show Again
            </button>
          </div>
        </div>

        {/* Close X */}
        <button
          onClick={handleLater}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition"
          aria-label="Close"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Keyframe animation */}
      <style>{`
        @keyframes pwaModalIn {
          from { opacity: 0; transform: scale(0.88) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default PWAInstallPrompt;
