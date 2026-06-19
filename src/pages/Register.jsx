import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import { useToast } from '../components/ui/Toast';

export const Register = () => {
  const [role, setRole] = useState('candidate');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    companyName: '',
    website: '',
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.register({ ...formData, role });
      addToast('Account created successfully!');
      navigate('/login');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join our community and start your professional journey."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="flex p-1.5 bg-slate-900 border border-slate-800 rounded-xl mb-10 shadow-inner">
          <button 
            type="button" 
            onClick={() => setRole('candidate')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${role === 'candidate' ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30 shadow-[0_0_15px_rgba(212,175,55,0.15)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Candidate
          </button>
          <button 
            type="button" 
            onClick={() => setRole('employer')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${role === 'employer' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]' : 'text-slate-500 hover:text-slate-300'}`}
          >
            Employer
          </button>
        </div>

        {role === 'candidate' ? (
          <>
            <Input label="Full Name" placeholder="John Doe" required onChange={e => setFormData({...formData, name: e.target.value})} />
            <Input label="Email Address" type="email" placeholder="john@example.com" required onChange={e => setFormData({...formData, email: e.target.value})} />
            <Input label="Phone Number" placeholder="+1 234 567 890" onChange={e => setFormData({...formData, phone: e.target.value})} />
          </>
        ) : (
          <>
            <Input label="Company Name" placeholder="TechNova Inc." required onChange={e => setFormData({...formData, companyName: e.target.value})} />
            <Input label="Work Email" type="email" placeholder="hr@company.com" required onChange={e => setFormData({...formData, email: e.target.value})} />
            <Input label="Company Website" placeholder="https://company.com" onChange={e => setFormData({...formData, website: e.target.value})} />
          </>
        )}
        
        <Input label="Password" type="password" placeholder="••••••••" required onChange={e => setFormData({...formData, password: e.target.value})} />

        <Button className="w-full py-4" disabled={loading}>
          {loading ? 'Creating account...' : 'Create Account'}
        </Button>

        <p className="text-center text-slate-500 text-sm">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
