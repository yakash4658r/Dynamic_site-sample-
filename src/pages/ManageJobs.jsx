import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { Trash2, Edit, Eye } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export const ManageJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    api.getEmployerJobs(user?.id || 'e1').then(data => {
      setJobs(data);
      setLoading(false);
    });
  }, [user]);

  const handleDelete = (id) => {
    setJobs(jobs.filter(j => j.id !== id));
    addToast('Job deleted successfully');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900">Your Job Listings</h2>
        <Button>+ Post New Job</Button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {loading ? (
          [1,2,3].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)
        ) : jobs.length > 0 ? (
          jobs.map(job => (
            <div key={job.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6 hover:shadow-md transition-all">
              <div className="flex items-center gap-4">
                <img src={job.companyLogo} alt={job.company} className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <div className="font-bold text-slate-900">{job.title}</div>
                  <div className="text-sm text-slate-500">{job.location} • {job.type}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-900">24</div>
                  <div className="text-xs text-slate-500 uppercase font-semibold">Applicants</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="p-2" title="View Applicants"><Eye className="w-5 h-5" /></Button>
                  <Button variant="ghost" className="p-2" title="Edit Job"><Edit className="w-5 h-5" /></Button>
                  <Button variant="ghost" className="p-2 text-red-500 hover:bg-red-50" title="Delete Job" onClick={() => handleDelete(job.id)}><Trash2 className="w-5 h-5" /></Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 mb-4">You haven't posted any jobs yet.</p>
            <Button>Create Your First Job Post</Button>
          </div>
        )}
      </div>
    </div>
  );
};
