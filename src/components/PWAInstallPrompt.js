import React, { useState, useEffect } from 'react';

const PWAInstallPrompt = ({ triggerOnHome = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Never show if already running as installed PWA
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;
    if (isStandalone) return;

    // Never show if user explicitly said "Don't Ask Again"
    if (localStorage.getItem('pwa_never_show') === '1') return;

    // Detect iOS Safari
    const ua = window.navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) setIsIOS(true);

    // Capture Android/Chrome native install event
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show modal automatically on home page after short delay
    let timer;
    if (triggerOnHome) {
      timer = setTimeout(() => {
        setShowModal(true);
      }, 1200);
    }

    return () => {
      clearTimeout(timer);
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
    localStorage.setItem('pwa_never_show', '1');
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        background: 'rgba(2, 6, 23, 0.72)',
        backdropFilter: 'blur(6px)',
      }}
      onClick={handleClose}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '360px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          animation: 'pwaModalIn 0.38s cubic-bezier(0.22,1,0.36,1) both',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0D9488 0%, #0284C7 100%)',
            padding: '32px 24px 24px',
            textAlign: 'center',
            color: '#fff',
          }}
        >
          {/* Icon */}
          <div style={{
            width: 64, height: 64,
            borderRadius: 18,
            background: 'rgba(255,255,255,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          }}>
            <svg width="34" height="34" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: '-0.3px' }}>
            Install MediCare Pro
          </h2>
        </div>

        {/* ── Body ── */}
        <div style={{ background: '#fff', padding: '20px 24px 24px' }}>

          {/* iOS instructions */}
          {isIOS && (
            <div style={{
              background: '#f0f9ff', border: '1px solid #bae6fd',
              borderRadius: 14, padding: '12px 14px',
              fontSize: 12, color: '#0c4a6e', lineHeight: 1.6, marginBottom: 16,
            }}>
              <p style={{ fontWeight: 700, margin: '0 0 4px' }}>📱 To install on iPhone / iPad:</p>
              <p style={{ margin: 0 }}>
                Tap the <strong>Share</strong> button (⬆) in Safari, then select{' '}
                <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          )}

          {/* Android/Desktop — native install button */}
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              style={{
                width: '100%', height: 48, borderRadius: 14,
                border: 'none', cursor: 'pointer',
                background: 'linear-gradient(135deg, #0D9488, #0284C7)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                marginBottom: 12, boxShadow: '0 4px 12px rgba(13,148,136,0.35)',
                transition: 'opacity .15s',
              }}
              onMouseOver={e => e.target.style.opacity = '0.88'}
              onMouseOut={e => e.target.style.opacity = '1'}
            >
              📲 Install App Now
            </button>
          )}

          {/* Android/Desktop — manual instructions when no native prompt */}
          {!isIOS && !deferredPrompt && (
            <div style={{
              background: '#f8fafc', border: '1px solid #e2e8f0',
              borderRadius: 14, padding: '12px 14px',
              fontSize: 12, color: '#475569', lineHeight: 1.6, marginBottom: 16,
            }}>
              <p style={{ fontWeight: 700, margin: '0 0 4px' }}>📲 How to install:</p>
              <p style={{ margin: 0 }}>
                Open in <strong>Chrome</strong>, tap the menu <strong>(⋮)</strong>, then choose{' '}
                <strong>"Add to Home Screen"</strong>.
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <button
              onClick={handleClose}
              style={{
                flex: 1, height: 44, borderRadius: 12, cursor: 'pointer',
                border: '2px solid #0D9488', background: 'transparent',
                color: '#0D9488', fontWeight: 700, fontSize: 13,
                transition: 'background .15s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f0fdfa'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              Not Now
            </button>
            <button
              onClick={handleNeverShow}
              style={{
                flex: 1, height: 44, borderRadius: 12, cursor: 'pointer',
                border: '1px solid #e2e8f0', background: 'transparent',
                color: '#94a3b8', fontSize: 12, fontWeight: 500,
                transition: 'background .15s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#f8fafc'}
              onMouseOut={e => e.currentTarget.style.background = 'transparent'}
            >
              Don't Ask Again
            </button>
          </div>
        </div>

        {/* Close X */}
        <button
          onClick={handleClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: 12, right: 12,
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.25)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="14" height="14" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <style>{`
        @keyframes pwaModalIn {
          from { opacity: 0; transform: scale(0.84) translateY(28px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
      `}</style>
    </div>
  );
};

export default PWAInstallPrompt;
