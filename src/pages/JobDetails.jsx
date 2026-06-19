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
    <div className="bg-slate-950 min-h-screen pt-12 pb-24 relative">
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-500/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute top-40 left-0 w-1/4 h-64 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-12">
          <button onClick={() => navigate(-1)} className="mb-8 text-slate-400 hover:text-primary-400 font-medium tracking-wide flex items-center gap-2 transition-colors">
            ← Back to Elite Roles
          </button>
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 bg-slate-900/40 p-8 rounded-[2rem] border border-slate-800/50 backdrop-blur-xl shadow-2xl">
            <div className="flex gap-6 items-start">
              <div className="relative shrink-0">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-amber-500 rounded-2xl blur opacity-30"></div>
                <img src={job.companyLogo} alt={job.company} className="relative w-24 h-24 rounded-2xl object-cover border border-slate-700 bg-slate-900 p-2" />
              </div>
              <div>
                <div className="flex items-center gap-4 mb-3 flex-wrap">
                  <h1 className="text-4xl font-serif font-black text-slate-100 tracking-tight">{job.title}</h1>
                  <Badge variant="primary" className="bg-primary-500/20 text-primary-400 border border-primary-500/30 text-xs tracking-wider">{job.type}</Badge>
                </div>
                <div className="flex flex-wrap gap-5 text-slate-400 font-medium">
                  <span className="flex items-center gap-2 text-slate-300"><Briefcase className="w-5 h-5 text-primary-600" /> {job.company}</span>
                  <span className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary-600" /> {job.location}</span>
                  <span className="flex items-center gap-2"><DollarSign className="w-5 h-5 text-primary-600" /> {job.salary}</span>
                  <span className="flex items-center gap-2"><Clock className="w-5 h-5 text-primary-600" /> Posted {job.postedAt}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
              <button className="btn-secondary flex items-center justify-center gap-2 p-4">
                <Bookmark className="w-5 h-5" />
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2 p-4">
                <Share2 className="w-5 h-5" />
              </button>
              <button onClick={handleApply} disabled={applied} className="btn-primary flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-4 text-lg">
                {applied ? <><CheckCircle className="w-5 h-5" /> Applied</> : 'Apply Now'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            <section className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800/50">
              <h2 className="text-2xl font-serif font-bold text-slate-100 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary-500/50 block"></span> About the Role
              </h2>
              <p className="text-slate-300 leading-relaxed text-lg font-light">{job.description}</p>
            </section>

            <section className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800/50">
              <h2 className="text-2xl font-serif font-bold text-slate-100 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary-500/50 block"></span> Responsibilities
              </h2>
              <ul className="space-y-4">
                {job.requirements.slice(0, 4).map((req, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-300 font-light text-lg">
                    <div className="mt-2 w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(212,175,55,0.8)] shrink-0" />
                    {req}
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-slate-900/30 p-8 rounded-3xl border border-slate-800/50">
              <h2 className="text-2xl font-serif font-bold text-slate-100 mb-6 flex items-center gap-3">
                <span className="w-8 h-px bg-primary-500/50 block"></span> Required Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {job.skills.map(skill => (
                  <Badge key={skill} variant="secondary" className="px-5 py-2 text-sm bg-slate-950 border border-slate-700 text-slate-300 font-medium tracking-wide">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8">
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800/80 backdrop-blur-md">
              <h3 className="font-serif font-bold text-xl text-slate-100 mb-4">Company Overview</h3>
              <p className="text-slate-400 mb-8 font-light leading-relaxed">
                {job.company} is an elite innovator in their field, focused on building a sustainable and inclusive future with cutting-edge technology.
              </p>
              <button className="btn-secondary w-full">Visit Company Website</button>
            </div>
            
            <div className="bg-gradient-to-br from-primary-600/90 to-amber-700/90 p-8 rounded-3xl text-white shadow-[0_0_40px_rgba(212,175,55,0.2)] border border-primary-400/30 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
              <h3 className="font-serif font-bold text-2xl mb-3 relative z-10">Exclusive Coaching</h3>
              <p className="text-primary-50 text-sm mb-8 font-medium leading-relaxed relative z-10">Our executive consultants are here to help you craft the perfect application for this role.</p>
              <button className="w-full py-4 bg-slate-950/40 hover:bg-slate-950/60 transition-colors rounded-xl text-white font-bold tracking-wide border border-white/10 backdrop-blur-sm relative z-10">
                Get Expert Advice
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
