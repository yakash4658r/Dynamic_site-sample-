import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../layouts/AuthLayout';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { api } from '../services/api';
import { useToast } from '../components/ui/Toast';
import { Lock, Mail } from 'lucide-react';

export const Login = () => {
  const [role, setRole] = useState('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api.login({ email, password, role });
      localStorage.setItem('user', JSON.stringify(result.user));
      localStorage.setItem('role', result.role);
      addToast('Welcome back!');
      navigate(result.role === 'candidate' ? '/candidate/dashboard' : '/employer/dashboard');
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Login to manage your career or find the best talent."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex p-1 bg-slate-100 rounded-xl mb-8">
          <button 
            type="button" 
            onClick={() => setRole('candidate')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'candidate' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Candidate
          </button>
          <button 
            type="button" 
            onClick={() => setRole('employer')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${role === 'employer' ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Employer
          </button>
        </div>

        <Input 
          label="Email Address" 
          type="email" 
          placeholder="name@company.com" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <Input 
          label="Password" 
          type="password" 
          placeholder="••••••••" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            Forgot password?
          </Link>
        </div>

        <Button className="w-full py-4" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>

        <p className="text-center text-slate-500 text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};
