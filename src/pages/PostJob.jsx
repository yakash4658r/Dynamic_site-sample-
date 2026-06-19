import React, { useState } from 'react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import { useNavigate } from 'react-router-dom';

export const PostJob = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    company: 'TechNova',
    location: '',
    salary: '',
    type: 'Full-time',
    category: 'Engineering',
    experience: '',
    description: '',
    requirements: '',
    skills: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.postJob({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        requirements: formData.requirements.split('\n').filter(r => r.trim()),
      });
      addToast('Job posted successfully!');
      navigate('/employer/manage-jobs');
    } catch (e) {
      addToast('Failed to post job', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
      <h2 className="text-3xl font-bold text-slate-900 mb-8">Post a New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Job Title" placeholder="e.g. Senior Frontend Engineer" required onChange={e => setFormData({...formData, title: e.target.value})} />
          <Input label="Location" placeholder="e.g. New York, NY or Remote" required onChange={e => setFormData({...formData, location: e.target.value})} />
          <Input label="Salary Range" placeholder="e.g. $120k - $150k" required onChange={e => setFormData({...formData, salary: e.target.value})} />
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Job Type</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50/50"
              value={formData.type}
              onChange={e => setFormData({...formData, type: e.target.value})}
            >
              <option>Full-time</option>
              <option>Contract</option>
              <option>Remote</option>
              <option>Part-time</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Experience Required" placeholder="e.g. 3+ years" required onChange={e => setFormData({...formData, experience: e.target.value})} />
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 ml-1">Category</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50/50"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option>Engineering</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Sales</option>
            </select>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Skills (comma separated)</label>
          <input 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50/50" 
            placeholder="React, Tailwind, TypeScript" 
            required
            onChange={e => setFormData({...formData, skills: e.target.value})}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Job Description</label>
          <textarea 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50/50 h-32" 
            placeholder="Tell candidates about the role..." 
            required
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-slate-700 ml-1">Requirements (one per line)</label>
          <textarea 
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50/50 h-32" 
            placeholder="Experience with X...&#10;Ability to Y..." 
            required
            onChange={e => setFormData({...formData, requirements: e.target.value})}
          />
        </div>

        <Button className="w-full py-4" disabled={loading}>
          {loading ? 'Posting...' : 'Publish Job Opening'}
        </Button>
      </form>
    </div>
  );
};
