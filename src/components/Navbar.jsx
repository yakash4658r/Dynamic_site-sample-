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
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-2xl">
              <Briefcase className="w-8 h-8" />
              <span>Job<span className="text-slate-900">Portal</span></span>
            </Link>
            
            <div className="hidden md:flex ml-10 items-center gap-6">
              {navLinks.map(link => (
                <Link key={link.path} to={link.path} className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                  {link.name}
                </Link>
              ))}
              {user && roleLinks[role]?.map(link => (
                <Link key={link.path} to={link.path} className="text-slate-600 hover:text-primary-600 font-medium transition-colors">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <Link to="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-full text-sm font-medium text-slate-700">
                  <User className="w-4 h-4" />
                  <span>{user.name || user.companyName}</span>
                </div>
                <Button variant="ghost" onClick={onLogout} className="text-red-500 hover:text-red-600 hover:bg-red-50">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-4 py-6 space-y-4">
          {navLinks.map(link => (
            <Link key={link.path} to={link.path} className="block text-slate-600 font-medium py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          {user && roleLinks[role]?.map(link => (
            <Link key={link.path} to={link.path} className="block text-slate-600 font-medium py-2" onClick={() => setIsOpen(false)}>
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {!user ? (
              <>
                <Link to="/login" className="block text-center"><Button variant="ghost" className="w-full">Login</Button></Link>
                <Link to="/register" className="block text-center"><Button className="w-full">Get Started</Button></Link>
              </>
            ) : (
              <Button variant="ghost" onClick={onLogout} className="w-full text-red-500">Logout</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
