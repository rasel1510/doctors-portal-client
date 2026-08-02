import React from 'react';
import { Stethoscope } from 'lucide-react';

const Loading = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-transparent">
      <div className="relative flex items-center justify-center">
        <div className="absolute h-16 w-16 animate-ping rounded-full bg-sky-400/30"></div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-cyan-400 text-white shadow-xl shadow-sky-500/30 animate-bounce">
          <Stethoscope className="h-7 w-7" />
        </div>
      </div>
      <p className="text-sm font-semibold text-slate-500 animate-pulse tracking-wide">
        Loading Doctors Portal...
      </p>
    </div>
  );
};

export default Loading;