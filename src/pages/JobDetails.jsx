import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import { MapPin, DollarSign, Briefcase, Clock, CheckCircle, Bookmark, Share2 } from 'lucide-react';
import { useToast } from '../components/ui/Toast';

export const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    api.getJobById(id).then(data => {
      setJob(data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [id]);

  const handleApply = async () => {
    try {
      await api.applyToJob({ jobId: id, candidateId: 'c1' });
      setApplied(true);
      addToast('Application submitted successfully!');
    } catch (e) {
      addToast('Failed to apply', 'error');
    }
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto px-4 py-20 space-y-8">
      <Skeleton className="w-full h-64 rounded-3xl" />
      <div className="space-y-4">
        <Skeleton className="w-1/3 h-10" />
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );

  if (!job) return <div className="text-center py-20">Job not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          ← Back to Jobs
        </Button>
        
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex gap-6">
            <img src={job.companyLogo} alt={job.company} className="w-20 h-20 rounded-2xl object-cover border border-slate-100 shadow-sm" />
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-slate-900">{job.title}</h1>
                <Badge variant="primary">{job.type}</Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-slate-500 text-sm">
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {job.salary}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Posted {job.postedAt}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="secondary" className="flex items-center gap-2">
              <Bookmark className="w-4 h-4" /> Save
            </Button>
            <Button variant="secondary" className="flex items-center gap-2">
              <Share2 className="w-4 h-4" /> Share
            </Button>
            <Button onClick={handleApply} disabled={applied} className="flex items-center gap-2">
              {applied ? <><CheckCircle className="w-4 h-4" /> Applied</> : 'Apply Now'}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">About the Role</h2>
            <p className="text-slate-600 leading-relaxed text-lg">{job.description}</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Responsibilities</h2>
            <ul className="space-y-3">
              {job.requirements.slice(0, 4).map((req, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-600">
                  <div className="mt-1 w-1.5 h-1.5 rounded-full bg-primary-500 shrink-0" />
                  {req}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Required Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <Badge key={skill} variant="secondary" className="px-4 py-1.5 text-sm">{skill}</Badge>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
            <h3 className="font-bold text-slate-900 mb-4">Company Overview</h3>
            <p className="text-sm text-slate-600 mb-6">
              {job.company} is a leading innovator in their field, focused on building a sustainable and inclusive future.
            </p>
            <Button variant="secondary" className="w-full text-sm">Visit Company Website</Button>
          </div>
          
          <div className="bg-primary-600 p-6 rounded-2xl text-white shadow-xl shadow-primary-200">
            <h3 className="font-bold mb-2">Need Help Applying?</h3>
            <p className="text-primary-100 text-sm mb-4">Our career consultants are here to help you craft the perfect application.</p>
            <Button variant="ghost" className="w-full bg-white/20 text-white hover:bg-white/30">Get Advice</Button>
          </div>
        </aside>
      </div>
    </div>
  );
};
