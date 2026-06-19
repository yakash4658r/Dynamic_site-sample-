import React from 'react';
import { Briefcase, Globe, MessageCircle, Link2, Camera, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-2xl mb-6">
              <Briefcase className="w-8 h-8" />
              <span>Job<span className="text-slate-900">Portal</span></span>
            </Link>
            <p className="text-slate-500 leading-relaxed mb-6">
              Connecting the best talent with the world's most innovative companies. Your dream career starts here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary-100 hover:text-primary-600 transition-all"><Globe className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary-100 hover:text-primary-600 transition-all"><MessageCircle className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary-100 hover:text-primary-600 transition-all"><Link2 className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-primary-100 hover:text-primary-600 transition-all"><Camera className="w-5 h-5" /></a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-slate-500 hover:text-primary-600 transition-colors">Home</Link></li>
              <li><Link to="/jobs" className="text-slate-500 hover:text-primary-600 transition-colors">Find Jobs</Link></li>
              <li><Link to="/contact" className="text-slate-500 hover:text-primary-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/about" className="text-slate-500 hover:text-primary-600 transition-colors">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">For Candidates</h4>
            <ul className="space-y-4">
              <li><Link to="/register" className="text-slate-500 hover:text-primary-600 transition-colors">Create Profile</Link></li>
              <li><Link to="/jobs" className="text-slate-500 hover:text-primary-600 transition-colors">Browse Jobs</Link></li>
              <li><Link to="/tips" className="text-slate-500 hover:text-primary-600 transition-colors">Career Advice</Link></li>
              <li><Link to="/resume-builder" className="text-slate-500 hover:text-primary-600 transition-colors">Resume Builder</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-slate-500">
                <MapPin className="w-5 h-5 text-primary-600 shrink-0" />
                <span>123 Tech Plaza, Silicon Valley, CA 94025</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <Phone className="w-5 h-5 text-primary-600 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-slate-500">
                <Mail className="w-5 h-5 text-primary-600 shrink-0" />
                <span>support@jobportal.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-100 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} JobPortal Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
