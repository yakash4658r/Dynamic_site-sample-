import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Skeleton } from '../components/ui/Skeleton';
import { Briefcase, Users, CheckCircle, Clock } from 'lucide-react';

export const EmployerDashboard = ({ user }) => {
  const [stats, setStats] = useState({ activeJobs: 0, totalApplicants: 0, shortlisted: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEmployerJobs(user?.id || 'e1').then(jobs => {
      setStats({
        activeJobs: jobs.length,
        totalApplicants: 124, // Mock
        shortlisted: 42, // Mock
      });
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium mb-1">Active Job Posts</div>
            <div className="text-3xl font-bold text-slate-900">{loading ? '...' : stats.activeJobs}</div>
          </div>
          <div className="p-4 bg-blue-50 rounded-2xl text-blue-600">
            <Briefcase className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium mb-1">Total Applicants</div>
            <div className="text-3xl font-bold text-slate-900">{loading ? '...' : stats.totalApplicants}</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl text-purple-600">
            <Users className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <div className="text-slate-500 text-sm font-medium mb-1">Shortlisted Candidates</div>
            <div className="text-3xl font-bold text-slate-900">{loading ? '...' : stats.shortlisted}</div>
          </div>
          <div className="p-4 bg-emerald-50 rounded-2xl text-emerald-600">
            <CheckCircle className="w-8 h-8" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-6">Recent Applicants</h3>
          <div className="space-y-4">
            {[1,2,3,4].map(i => (
              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-primary-200 transition-all cursor-pointer">
                <div className="flex items-center gap-4">
                  <img src={`https://i.pravatar.cc/150?u=${i}`} alt="avatar" className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">Candidate Name ${i}</div>
                    <div className="text-xs text-slate-500">Applied for Senior Frontend Engineer</div>
                  </div>
                </div>
                <Badge variant="secondary">Under Review</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-bold text-slate-900 text-lg mb-6">Upcoming Interviews</h3>
          <div className="space-y-4">
            {[1,2].map(i => (
              <div key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-2xl">
                <div className="w-12 h-12 bg-primary-50 text-primary-600 rounded-xl flex flex-col items-center justify-center font-bold">
                  <span className="text-xs uppercase">Jun</span>
                  <span className="text-lg leading-none">20</span>
                </div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">Interview with Sarah Connor</div>
                  <div className="text-xs text-slate-500">10:00 AM • Google Meet</div>
                </div>
                <Button variant="ghost" className="text-xs">Join</Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
