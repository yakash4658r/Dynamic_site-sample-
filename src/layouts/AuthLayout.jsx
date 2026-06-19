import React from 'react';
import { Briefcase } from 'lucide-react';

export const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        <div className="hidden md:flex bg-gradient-to-br from-primary-600 to-accent-600 p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full -ml-32 -mb-32 blur-3xl" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-white font-bold text-3xl mb-8">
              <Briefcase className="w-8 h-8" />
              <span>JobPortal</span>
            </div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">
              Your bridge to the <br />next big opportunity.
            </h2>
            <div className="space-y-6">
              {[
                'Access to exclusive job openings',
                'AI-powered resume optimization',
                'Direct connection with recruiters',
                'Real-time application tracking'
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-primary-100">
                  <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 text-sm text-primary-200">
            © {new Date().getFullYear()} JobPortal Premium. All rights reserved.
          </div>
        </div>
        
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{title}</h2>
            <p className="text-slate-500">{subtitle}</p>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};
