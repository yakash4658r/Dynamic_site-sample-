import React from 'react';
import { Briefcase } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary-400/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-amber-400/10 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] overflow-hidden border border-slate-200 relative z-10">
        <div className="hidden md:flex bg-gradient-to-br from-primary-50 to-slate-100 p-16 text-slate-900 flex-col justify-between relative overflow-hidden border-r border-slate-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-300/20 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-300/20 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 text-primary-600 font-serif font-bold text-4xl tracking-tight mb-12">
              <div className="p-3 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl shadow-[0_4px_15px_rgba(45,117,191,0.3)]">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <span>Job<span className="text-slate-900">Portal</span></span>
            </div>
            <h2 className="text-5xl font-serif font-black mb-8 leading-tight tracking-tight text-slate-900">
              Step into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">Excellence.</span>
            </h2>
            <div className="space-y-6">
              {[
                'Access to exclusive elite opportunities',
                'AI-driven profile optimization',
                'Direct channel to executive recruiters',
                'Priority application handling'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-600 font-medium">
                  <div className="w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                    <div className="w-2 h-2 bg-primary-500 rounded-full shadow-[0_4px_10px_rgba(45,117,191,0.5)]" />
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
        
        <div className="p-8 md:p-16 lg:p-20 flex flex-col justify-center bg-white/60">
          <div className="mb-12">
            <h2 className="text-4xl font-serif font-bold text-slate-900 mb-3">{title}</h2>
            <p className="text-slate-500 text-lg leading-relaxed">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
