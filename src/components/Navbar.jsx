import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Briefcase, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from './ui/Button';

export const Navbar = ({ user, role, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Find Jobs', path: '/jobs' },
    { name: 'Contact', path: '/contact' },
  ];

  const roleLinks = {
    candidate: [
      { name: 'Dashboard', path: '/candidate/dashboard' },
      { name: 'Profile', path: '/candidate/profile' },
    ],
    employer: [
      { name: 'Dashboard', path: '/employer/dashboard' },
      { name: 'Post Job', path: '/employer/post-job' },
      { name: 'Manage Jobs', path: '/employer/manage-jobs' },
    ],
  };

  return (
    <nav className="bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40 border-b border-primary-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 text-primary-500 font-serif font-bold text-3xl tracking-tight">
              <div className="p-2 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                <Briefcase className="w-6 h-6 text-slate-950" />
              </div>
              <span>Job<span className="text-slate-100">Portal</span></span>
            </Link>
            
            <div className="hidden md:flex ml-12 items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="text-slate-300 hover:text-primary-400 font-medium transition-all duration-300 relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              {user && roleLinks[role]?.map(link => (
                <Link key={link.path} to={link.path} className="text-slate-300 hover:text-primary-400 font-medium transition-all duration-300 relative group">
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-5">
            {!user ? (
              <>
                <Link to="/login" className="text-slate-300 hover:text-white font-medium transition-colors">
                  Login
                </Link>
                <Link to="/register">
                  <button className="btn-primary py-2.5">Get Started</button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2 px-4 py-1.5 bg-slate-900 border border-slate-800 rounded-full text-sm font-medium text-slate-300 shadow-inner">
                  <User className="w-4 h-4 text-primary-500" />
                  <span>{user.name || user.companyName}</span>
                </div>
                <button onClick={onLogout} className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-2 text-sm font-medium">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-primary-500 transition-colors">
              {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-b border-primary-500/20 px-4 py-6 space-y-4 absolute w-full">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className="block text-slate-300 hover:text-primary-400 font-medium py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          {user && roleLinks[role]?.map(link => (
            <Link key={link.path} to={link.path} className="block text-slate-300 hover:text-primary-400 font-medium py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="pt-6 border-t border-slate-800 flex flex-col gap-4">
            {!user ? (
              <>
                <Link to="/login" className="block text-center text-slate-300 font-medium py-2">Login</Link>
                <Link to="/register" className="block text-center"><button className="btn-primary w-full">Get Started</button></Link>
              </>
            ) : (
              <button onClick={onLogout} className="w-full text-red-400 font-medium py-2 flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
