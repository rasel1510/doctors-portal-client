import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShieldAlert, Copy, Check, ExternalLink, Globe, Info } from 'lucide-react';
import { toast } from 'react-toastify';

const AuthDomainHelpModal = ({ isOpen, onClose, customDomain }) => {
  const [copied, setCopied] = useState(false);
  const currentDomain = customDomain || (typeof window !== 'undefined' ? window.location.hostname : '');
  const fullOrigin = typeof window !== 'undefined' ? window.location.origin : '';

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && currentDomain) {
        await navigator.clipboard.writeText(currentDomain);
        setCopied(true);
        toast.success(`Copied "${currentDomain}" to clipboard!`);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch (err) {
      toast.info(`Hostname: ${currentDomain}`);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg rounded-3xl p-6 bg-white border border-slate-200 shadow-2xl">
        <DialogHeader className="space-y-2 text-left">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold text-slate-900">
                Firebase Domain Authorization Required
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Google Sign-In was blocked because this domain/IP is not authorized in your Firebase Console.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs text-slate-700">
          {/* Domain Box */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Globe className="h-3.5 w-3.5 text-teal-600" /> Current Hostname
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                Unauthorized
              </span>
            </div>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-xl p-2.5">
              <code className="text-sm font-bold text-slate-900 font-mono select-all">
                {currentDomain}
              </code>
              <Button
                type="button"
                onClick={handleCopy}
                size="sm"
                className={`h-8 text-xs font-semibold rounded-lg gap-1.5 transition-all ${
                  copied
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    : 'bg-teal-600 hover:bg-teal-700 text-white'
                }`}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied!' : 'Copy Domain'}
              </Button>
            </div>
            <p className="text-[11px] text-slate-500">
              App URL: <span className="font-mono text-slate-700">{fullOrigin}</span>
            </p>
          </div>

          {/* Quick Step Guide */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
              <Info className="h-3.5 w-3.5 text-sky-600" /> How to fix this in 1 minute:
            </h4>
            <ol className="space-y-2 bg-sky-50/60 p-3 rounded-2xl border border-sky-100 text-[12px] text-slate-700 leading-relaxed">
              <li className="flex gap-2">
                <span className="font-bold text-sky-700 shrink-0">1.</span>
                <span>Open <strong>Firebase Console</strong> and select your project.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-sky-700 shrink-0">2.</span>
                <span>Go to <strong>Authentication</strong> &rarr; <strong>Settings</strong> tab &rarr; <strong>Authorized domains</strong>.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-sky-700 shrink-0">3.</span>
                <span>Click <strong>Add domain</strong> and paste <code className="bg-white px-1.5 py-0.5 rounded border border-sky-200 font-mono font-bold">{currentDomain}</code>.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-sky-700 shrink-0">4.</span>
                <span>Save changes and tap <strong>Google Login</strong> again!</span>
              </li>
            </ol>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
          <a
            href="https://console.firebase.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button variant="outline" className="w-full h-10 text-xs font-semibold rounded-xl gap-1.5">
              Firebase Console <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          </a>
          <Button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto h-10 text-xs font-semibold rounded-xl"
            style={{ background: '#0D9488' }}
          >
            Got It & Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDomainHelpModal;
