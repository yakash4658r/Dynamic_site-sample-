import React from 'react';
import { Briefcase } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800/50 relative z-10">
        <div className="hidden md:flex bg-gradient-to-br from-slate-900 to-slate-950 p-16 text-white flex-col justify-between relative overflow-hidden border-r border-slate-800/50">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-primary-500 font-serif font-bold text-4xl tracking-tight mb-12">
              <div className="p-3 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Briefcase className="w-8 h-8 text-slate-950" />
              </div>
              <span>Job<span className="text-slate-100">Portal</span></span>
            </div>
            <h2 className="text-5xl font-serif font-black mb-8 leading-tight tracking-tight text-white">
              Step into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-amber-500">Excellence.</span>
            </h2>
            <div className="space-y-6">
              {[
                'Access to exclusive elite opportunities',
                'AI-driven profile optimization',
                'Direct channel to executive recruiters',
                'Priority application handling'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shadow-inner">
                    <div className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 text-sm text-slate-500 font-medium tracking-wide">
            © {new Date().getFullYear()} JobPortal Premium. The Elite Network.
          </div>
        </div>
        
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-slate-900/30">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-slate-100 mb-3">{title}</h2>
            <p className="text-slate-400 text-lg leading-relaxed">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
