import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  User, 
  FileText, 
  Settings, 
  LogOut, 
  PlusCircle,
  Users as UsersIcon,
  Bell
} from 'lucide-react';
import { Button } from '../components/ui/Button';

export const DashboardLayout = ({ children, role, user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = {
    candidate: [
      { name: 'Dashboard', path: '/candidate/dashboard', icon: LayoutDashboard },
      { name: 'Applied Jobs', path: '/candidate/dashboard', icon: Briefcase },
      { name: 'My Profile', path: '/candidate/profile', icon: User },
      { name: 'Resume', path: '/candidate/resume', icon: FileText },
    ],
    employer: [
      { name: 'Dashboard', path: '/employer/dashboard', icon: LayoutDashboard },
      { name: 'Post a Job', path: '/employer/post-job', icon: PlusCircle },
      { name: 'Manage Jobs', path: '/employer/manage-jobs', icon: Briefcase },
      { name: 'Applicants', path: '/employer/applicants', icon: UsersIcon },
    ],
  };

  const currentMenu = menuItems[role] || [];

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-100 hidden lg:flex flex-col sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-2xl">
            <Briefcase className="w-8 h-8" />
            <span>JobPortal</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {currentMenu.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${isActive ? 'bg-primary-50 text-primary-600' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-2">
          <Link to="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-all font-medium">
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-20 bg-white border-b border-slate-100 px-8 flex items-center justify-between sticky top-0 z-30">
          <h2 className="text-xl font-bold text-slate-900">
            {currentMenu.find(item => item.path === location.pathname)?.name || 'Overview'}
          </h2>
          
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-100">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-slate-900">{user?.name || user?.companyName}</div>
                <div className="text-xs text-slate-500 capitalize">{role}</div>
              </div>
              <img 
                src={user?.profilePic || 'https://via.placeholder.com/40'} 
                alt="profile" 
                className="w-10 h-10 rounded-full border border-slate-200"
              />
            </div>
          </div>
        </header>
        
        <main className="p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};
