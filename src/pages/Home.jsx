import React from 'react';
import { Link } from 'react-router-dom';
import { Search, TrendingUp, Users, Briefcase, ArrowRight, Star } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { JobCard } from '../components/JobCard';
import { motion } from 'framer-motion';
import { api } from '../services/api';
import { useState, useEffect } from 'react';
import { Skeleton } from '../components/ui/Skeleton';

export const Home = () => {
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJobs().then(jobs => {
      setFeaturedJobs(jobs.filter(j => j.featured));
      setLoading(false);
    });
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white pt-20 pb-32">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-100 rounded-full blur-3xl opacity-50" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <Badge variant="primary" className="mb-6">🚀 New: AI Job Matching is here!</Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-600">Dream Job</span> Faster
            </h1>
            <p className="text-lg text-slate-600 mb-10 leading-relaxed">
              Connect with top companies and land your next role in tech, design, or marketing. 
              Join 10,000+ professionals already growing their careers.
            </p>

            <div className="flex flex-col md:flex-row gap-3 p-2 bg-white shadow-2xl rounded-2xl border border-slate-100 max-w-4xl mx-auto">
              <div className="flex-1 flex items-center gap-3 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-100">
                <Search className="text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Job title or keyword" 
                  className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
              <div className="flex-1 flex items-center gap-3 px-4 py-2">
                <MapPin className="text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="City or Remote" 
                  className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                />
              </div>
              <Link to="/jobs">
                <Button className="w-full md:w-auto py-3 px-8">Search Jobs</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: 'Active Jobs', value: '12k+', icon: Briefcase },
              { label: 'Companies', value: '800+', icon: TrendingUp },
              { label: 'Candidates', value: '50k+', icon: Users },
              { label: 'Success Rate', value: '94%', icon: Star },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <stat.icon className="w-6 h-6 text-primary-600 mb-2" />
                <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-slate-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Opportunities</h2>
              <p className="text-slate-600">Hand-picked roles from the top startups and enterprises.</p>
            </div>
            <Link to="/jobs" className="hidden md:flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all">
              View All Jobs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1,2,3].map(i => (
                <div key={i} className="card-premium p-6 space-y-4">
                  <Skeleton className="w-12 h-12 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="w-3/4 h-6" />
                    <Skeleton className="w-1/2 h-4" />
                  </div>
                  <Skeleton className="w-full h-10 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/jobs">
              <Button className="w-full">View All Jobs</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-500 to-transparent opacity-50" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-16 border border-white/20 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to elevate your career?</h2>
              <p className="text-primary-100 text-lg mb-8">Join our community of professionals and start applying to the best roles today.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Link to="/register">
                <Button className="w-full sm:w-auto bg-white text-primary-600 hover:bg-primary-50">Create Account</Button>
              </Link>
              <Link to="/employer/register">
                <Button variant="ghost" className="w-full sm:w-auto bg-primary-700 text-white border-white/30 hover:bg-primary-800">Hire Talent</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import { Badge } from '../components/ui/Badge';
import { MapPin } from 'lucide-react';
