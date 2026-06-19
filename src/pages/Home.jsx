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
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-40">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-400/10 rounded-full blur-[120px]" />
          <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] bg-amber-400/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[40%] bg-primary-300/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-block mb-8">
              <span className="px-4 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-600 text-sm font-bold tracking-wide uppercase shadow-sm backdrop-blur-md">
                ✨ The Elite Network for Professionals
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-serif font-black text-slate-900 mb-8 tracking-tight leading-tight">
              Discover Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-primary-500 to-amber-500 drop-shadow-sm">True Calling.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 mb-14 leading-relaxed font-light max-w-2xl mx-auto">
              Join the world's most exclusive job portal. Connect with visionary companies and elevate your career to unprecedented heights.
            </p>

            {/* Premium Search Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col md:flex-row gap-4 p-3 bg-white/80 backdrop-blur-xl rounded-2xl border border-slate-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] max-w-4xl mx-auto relative group hover:border-primary-300 transition-all duration-500"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-400/20 to-amber-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              
              <div className="relative flex-1 flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                <Search className="text-primary-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  className="w-full outline-none text-slate-900 placeholder:text-slate-400 bg-transparent text-lg font-medium"
                />
              </div>
              <div className="relative flex-1 flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                <MapPin className="text-primary-500 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="City, state, or Remote" 
                  className="w-full outline-none text-slate-900 placeholder:text-slate-400 bg-transparent text-lg font-medium"
                />
              </div>
              <Link to="/jobs" className="relative w-full md:w-auto">
                <button className="btn-primary w-full h-full py-4 px-10 text-lg font-bold tracking-wide">
                  Search
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Bright Glassmorphism */}
      <section className="py-16 relative border-y border-slate-200/50 bg-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 text-center">
            {[
              { label: 'Elite Roles', value: '12k+', icon: Briefcase },
              { label: 'Top Companies', value: '800+', icon: TrendingUp },
              { label: 'Professionals', value: '50k+', icon: Users },
              { label: 'Success Rate', value: '98%', icon: Star },
            ].map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                key={i} 
                className="flex flex-col items-center p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-slate-100 shadow-sm hover:border-primary-200 transition-all duration-300"
              >
                <div className="p-4 bg-primary-50 rounded-xl border border-primary-100 shadow-inner mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="w-8 h-8 text-primary-600" />
                </div>
                <div className="text-4xl font-serif font-black text-slate-900 mb-1">{stat.value}</div>
                <div className="text-slate-500 font-bold tracking-wide uppercase text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-32 bg-slate-50 relative">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-primary-400/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Curated Opportunities</h2>
              <p className="text-lg text-slate-600 font-light">Hand-picked roles from visionary startups and global enterprises.</p>
            </div>
            <Link to="/jobs" className="group flex items-center gap-3 text-primary-600 font-bold hover:text-primary-700 transition-colors uppercase tracking-wider text-sm">
              View All Jobs 
              <span className="p-2 rounded-full bg-primary-100 group-hover:bg-primary-200 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1,2,3].map(i => (
                <div key={i} className="card-premium space-y-6">
                  <Skeleton className="w-16 h-16 rounded-2xl" />
                  <div className="space-y-3">
                    <Skeleton className="w-3/4 h-8" />
                    <Skeleton className="w-1/2 h-5" />
                  </div>
                  <Skeleton className="w-full h-12 rounded-xl" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center md:hidden">
            <Link to="/jobs">
              <button className="btn-secondary w-full py-4">Explore All Opportunities</button>
            </Link>
          </div>
        </div>
      </section>

      {/* Grand CTA Section */}
      <section className="py-32 relative overflow-hidden bg-slate-50">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-slate-100"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/90 backdrop-blur-2xl rounded-[3rem] p-10 md:p-20 border border-slate-200 shadow-[0_20px_60px_rgba(0,0,0,0.05)] text-center relative overflow-hidden">
            <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary-300/20 blur-[80px] rounded-full"></div>
            <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-amber-300/20 blur-[80px] rounded-full"></div>
            
            <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-8 tracking-tight">
              Ready to claim your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-amber-500">masterpiece?</span>
            </h2>
            <p className="text-slate-600 text-xl mb-12 font-light max-w-2xl mx-auto leading-relaxed">
              Step into the exclusive circle of top-tier professionals. Create your portfolio today and let the opportunities come to you.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 w-full md:w-auto">
              <Link to="/register">
                <button className="btn-primary w-full sm:w-auto py-4 px-12 text-lg shadow-[0_4px_20px_rgba(45,117,191,0.3)]">Join as Candidate</button>
              </Link>
              <Link to="/employer/register">
                <button className="btn-secondary w-full sm:w-auto py-4 px-12 text-lg">Hire Top Talent</button>
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
