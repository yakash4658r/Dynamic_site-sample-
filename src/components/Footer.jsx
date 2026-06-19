import React from 'react';
import { Briefcase, Globe, MessageCircle, Link2, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-primary-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 text-primary-600 font-serif font-bold text-3xl tracking-tight mb-6">
              <div className="p-2 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg shadow-[0_4px_15px_rgba(45,117,191,0.3)]">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <span>Job<span className="text-slate-900">Portal</span></span>
            </Link>
            <p className="text-slate-600 leading-relaxed mb-8">
              Connecting the best talent with the world's most innovative companies. Your dream career starts here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 shadow-sm"><Globe className="w-5 h-5" /></a>
              <a href="#" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 shadow-sm"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 shadow-sm"><Link2 className="w-5 h-5" /></a>
              <a href="#" className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-500 hover:bg-primary-50 hover:text-primary-600 hover:border-primary-200 transition-all duration-300 hover:-translate-y-1 shadow-sm"><Camera className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-lg mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Home</Link></li>
              <li><Link to="/jobs" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Find Jobs</Link></li>
              <li><Link to="/contact" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Contact Us</Link></li>
              <li><Link to="/about" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-lg mb-6">For Candidates</h4>
            <ul className="space-y-4">
              <li><Link to="/register" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Create Profile</Link></li>
              <li><Link to="/jobs" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Browse Jobs</Link></li>
              <li><Link to="/tips" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Career Advice</Link></li>
              <li><Link to="/resume-builder" className="text-slate-600 hover:text-primary-600 transition-colors flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-primary-200 group-hover:bg-primary-500 transition-colors"></span>Resume Builder</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif font-bold text-slate-900 text-lg mb-6">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-slate-600 group">
                <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-primary-300 transition-colors shadow-sm">
                  <MapPin className="w-4 h-4 text-primary-600" />
                </div>
                <span className="mt-1">123 Tech Plaza, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 group">
                <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-primary-300 transition-colors shadow-sm">
                  <Phone className="w-4 h-4 text-primary-600" />
                </div>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-slate-600 group">
                <div className="p-2 rounded-lg bg-white border border-slate-200 group-hover:border-primary-300 transition-colors shadow-sm">
                  <Mail className="w-4 h-4 text-primary-600" />
                </div>
                <span>support@jobportal.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} JobPortal Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-600 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
