import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { Briefcase, Clock, CheckCircle, XCircle, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export const CandidateDashboard = ({ user }) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMyApplications(user?.id || 'c1').then(data => {
      setApps(data);
      setLoading(false);
    });
  }, [user]);

  const statusColors = {
    'Applied': 'bg-blue-100 text-blue-700',
    'Under Review': 'bg-amber-100 text-amber-700',
    'Shortlisted': 'bg-emerald-100 text-emerald-700',
    'Rejected': 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-primary-600 to-primary-500 p-6 rounded-3xl text-white shadow-lg shadow-primary-200">
          <h3 className="text-lg font-medium opacity-90 mb-1">Welcome back, {user?.name}! 👋</h3>
          <p className="text-sm opacity-75 mb-6">You have 3 new job matches based on your skills.</p>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold">12 Applications</div>
            <div className="p-2 bg-white/20 rounded-lg">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium mb-1">Profile Completion</div>
            <div className="text-3xl font-bold text-slate-900">85%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-primary-500 h-full w-[85%]" />
            </div>
          </div>
          <div className="p-4 bg-primary-50 rounded-2xl text-primary-600">
            <User className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium mb-1">Saved Jobs</div>
            <div className="text-3xl font-bold text-slate-900">7 Jobs</div>
            <div className="text-xs text-primary-600 font-semibold mt-3 cursor-pointer hover:underline">View all saved jobs →</div>
          </div>
          <div className="p-4 bg-accent-50 rounded-2xl text-accent-600">
            <Bookmark className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-lg">Application Tracking</h3>
          <div className="flex gap-2">
            <Badge variant="primary">All</Badge>
            <Badge variant="secondary">Active</Badge>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Job Role</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Date Applied</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                [1,2,3].map(i => (
                  <tr key={i}>
                    <td className="px-6 py-4"><Skeleton className="w-32 h-4" /></td>
                    <td className="px-6 py-4"><Skeleton className="w-24 h-4" /></td>
                    <td className="px-6 py-4"><Skeleton className="w-20 h-4" /></td>
                    <td className="px-6 py-4"><Skeleton className="w-16 h-6 rounded-full" /></td>
                    <td className="px-6 py-4"><Skeleton className="w-12 h-8" /></td>
                  </tr>
                ))
              ) : apps.length > 0 ? (
                apps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{app.job?.title}</td>
                    <td className="px-6 py-4 text-slate-600">{app.job?.company}</td>
                    <td className="px-6 py-4 text-slate-500 text-sm">{new Date(app.appliedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[app.status]}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-semibold">View Details</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-500">No applications found. Start applying today!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import { User, Bookmark } from 'lucide-react';
