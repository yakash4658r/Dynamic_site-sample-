import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { api } from '../services/api';
import { JobCard } from '../components/JobCard';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';

export const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    type: '',
  });

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const data = await api.getJobs(filters);
      setJobs(data);
      setLoading(false);
    };
    fetchJobs();
  }, [filters]);

  return (
    <div className="bg-slate-950 min-h-screen pt-12 pb-24 relative">
      <div className="absolute top-0 right-0 w-1/3 h-64 bg-primary-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Filter Sidebar */}
          <aside className="w-full md:w-80 shrink-0 space-y-8">
            <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-slate-800/50 shadow-2xl sticky top-28">
              <div className="flex items-center gap-3 font-serif font-bold text-2xl text-slate-100 mb-8 border-b border-slate-800/50 pb-6">
                <Filter className="w-6 h-6 text-primary-500" />
                <span>Filters</span>
              </div>

              <div className="space-y-8">
                <div>
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 block">Search</label>
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-hover:text-primary-500 transition-colors" />
                    <input 
                      type="text" 
                      placeholder="Job title..." 
                      className="w-full pl-12 pr-4 py-3 bg-slate-950/50 rounded-xl border border-slate-800 focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 outline-none text-slate-200 placeholder:text-slate-600 transition-all duration-300"
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 block">Category</label>
                  <div className="space-y-3">
                    {['Engineering', 'Design', 'Marketing', 'Sales'].map(cat => (
                      <label key={cat} className="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-primary-400 transition-colors group font-medium">
                        <input 
                          type="radio" 
                          name="category" 
                          className="w-4 h-4 text-primary-500 bg-slate-950 border-slate-700 focus:ring-primary-500/50" 
                          checked={filters.category === cat}
                          onChange={() => setFilters({...filters, category: cat})}
                        />
                        {cat}
                      </label>
                    ))}
                    <label className="flex items-center gap-3 text-slate-500 cursor-pointer hover:text-slate-300 transition-colors font-medium mt-4 pt-4 border-t border-slate-800/50" onClick={() => setFilters({...filters, category: ''})}>
                      <input type="radio" name="category" className="w-4 h-4 text-primary-500 bg-slate-950 border-slate-700" checked={!filters.category} readOnly />
                      All Categories
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-4 block">Job Type</label>
                  <div className="space-y-3">
                    {['Full-time', 'Contract', 'Remote', 'Part-time'].map(type => (
                      <label key={type} className="flex items-center gap-3 text-slate-400 cursor-pointer hover:text-primary-400 transition-colors font-medium">
                        <input 
                          type="checkbox" 
                          className="w-4 h-4 rounded text-primary-500 bg-slate-950 border-slate-700 focus:ring-primary-500/50" 
                          checked={filters.type === type}
                          onChange={() => setFilters({...filters, type: type === filters.type ? '' : type})}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-800/50">
                  <button className="w-full py-3 text-slate-400 hover:text-red-400 font-medium transition-colors text-sm uppercase tracking-wider" onClick={() => setFilters({search: '', category: '', type: ''})}>
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Job List */}
          <main className="flex-1">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-4xl font-serif font-bold text-slate-100 mb-2">Exclusive Opportunities</h1>
                <p className="text-slate-400">{jobs.length} elite roles matching your profile</p>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400 bg-slate-900/60 p-2 px-4 rounded-xl border border-slate-800">
                <span>Sort by:</span>
                <select className="bg-transparent font-bold text-slate-200 outline-none cursor-pointer focus:text-primary-400 appearance-none">
                  <option className="bg-slate-900">Latest Priority</option>
                  <option className="bg-slate-900">Highest Match</option>
                  <option className="bg-slate-900">Compensation</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="card-premium border-slate-800 bg-slate-900/50 p-6 space-y-4">
                    <Skeleton className="w-full h-24 bg-slate-800" />
                  </div>
                ))}
              </div>
            ) : jobs.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {jobs.map(job => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-dashed border-slate-700/50">
                <div className="bg-slate-950 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner border border-slate-800">
                  <Search className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-100 mb-3">No matching opportunities</h3>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">We couldn't find any roles matching your exact criteria right now. Adjust your filters or explore other categories.</p>
                <button className="btn-secondary" onClick={() => setFilters({search: '', category: '', type: ''})}>Clear All Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
