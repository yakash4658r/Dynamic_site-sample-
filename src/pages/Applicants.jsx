import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Skeleton } from '../components/ui/Skeleton';
import { FileText, CheckCircle, XCircle } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export const Applicants = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    api.getApplicants('1').then(data => {
      setApplicants(data);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (appId, status) => {
    await api.updateApplicationStatus(appId, status);
    setApplicants(applicants.map(a => a.id === appId ? { ...a, status } : a));
    addToast(`Status updated to ${status}`);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-slate-900">Job Applicants</h2>
        <Badge variant="primary">Senior Frontend Engineer</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          [1,2,3].map(i => <Skeleton key={i} className="h-32 w-full rounded-3xl" />)
        ) : applicants.length > 0 ? (
          applicants.map(app => (
            <div key={app.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4">
                <img src={app.candidate?.profilePic || 'https://via.placeholder.com/150'} alt="avatar" className="w-14 h-14 rounded-2xl object-cover" />
                <div>
                  <div className="font-bold text-slate-900">{app.candidate?.name}</div>
                  <div className="text-sm text-slate-500">{app.candidate?.email} • {app.candidate?.experience} Exp</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <Button variant="secondary" className="flex items-center gap-2 text-sm">
                  <FileText className="w-4 h-4" /> Resume
                </Button>
                <select 
                  className="px-3 py-2 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-primary-500"
                  value={app.status}
                  onChange={(e) => updateStatus(app.id, e.target.value)}
                >
                  <option>Applied</option>
                  <option>Under Review</option>
                  <option>Shortlisted</option>
                  <option>Rejected</option>
                </select>
                <div className="flex gap-2">
                  <Button variant="ghost" className="p-2 text-emerald-600 hover:bg-emerald-50" onClick={() => updateStatus(app.id, 'Shortlisted')}><CheckCircle className="w-5 h-5" /></Button>
                  <Button variant="ghost" className="p-2 text-red-600 hover:bg-red-50" onClick={() => updateStatus(app.id, 'Rejected')}><XCircle className="w-5 h-5" /></Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500">No applicants yet for this position.</p>
          </div>
        )}
      </div>
    </div>
  );
};
