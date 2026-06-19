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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <aside className="w-full md:w-80 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-28">
            <div className="flex items-center gap-2 font-bold text-lg text-slate-900 mb-6">
              <Filter className="w-5 h-5 text-primary-600" />
              <span>Filters</span>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Job title..." 
                    className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none text-sm"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">Category</label>
                <div className="space-y-2">
                  {['Engineering', 'Design', 'Marketing', 'Sales'].map(cat => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-primary-600 transition-colors">
                      <input 
                        type="radio" 
                        name="category" 
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500" 
                        checked={filters.category === cat}
                        onChange={() => setFilters({...filters, category: cat})}
                      />
                      {cat}
                    </label>
                  ))}
                  <label className="flex items-center gap-2 text-sm text-slate-400 cursor-pointer" onClick={() => setFilters({...filters, category: ''})}>
                    <input type="radio" name="category" className="w-4 h-4" checked={!filters.category} readOnly />
                    All Categories
                  </label>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-700 mb-3 block">Job Type</label>
                <div className="space-y-2">
                  {['Full-time', 'Contract', 'Remote', 'Part-time'].map(type => (
                    <label key={type} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer hover:text-primary-600 transition-colors">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" 
                        checked={filters.type === type}
                        onChange={() => setFilters({...filters, type: type === filters.type ? '' : type})}
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </div>

              <Button variant="ghost" className="w-full text-slate-500 text-sm" onClick={() => setFilters({search: '', category: '', type: ''})}>
                Clear All Filters
              </Button>
            </div>
          </div>
        </aside>

        {/* Job List */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Available Jobs</h1>
              <p className="text-slate-500">{jobs.length} jobs found matching your criteria</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              Sort by:
              <select className="bg-transparent font-semibold text-slate-900 outline-none cursor-pointer">
                <option>Latest</option>
                <option>Relevance</option>
                <option>Salary (High to Low)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6">
              {[1,2,3,4].map(i => (
                <div key={i} className="card-premium p-6 space-y-4">
                  <Skeleton className="w-full h-24" />
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
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
              <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs found</h3>
              <p className="text-slate-500 mb-6">Try adjusting your filters or search keywords.</p>
              <Button onClick={() => setFilters({search: '', category: '', type: ''})}>Clear Filters</Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
