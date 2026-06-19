import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { Badge } from './ui/Badge';

export const JobCard = ({ job }) => {
  return (
    <div className="card-premium group relative overflow-hidden">
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-amber-500 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            <img 
              src={job.companyLogo} 
              alt={job.company} 
              className="relative w-14 h-14 rounded-xl object-cover border border-slate-800 bg-slate-900 p-1"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/56'; }}
            />
          </div>
          <div>
            <h3 className="font-serif font-bold text-xl text-slate-100 group-hover:text-primary-400 transition-colors mb-1 tracking-tight">
              {job.title}
            </h3>
            <p className="text-slate-400 font-medium text-sm tracking-wide">{job.company}</p>
          </div>
        </div>
        <Badge variant={job.featured ? 'primary' : 'default'} className={job.featured ? "bg-primary-500/10 text-primary-400 border border-primary-500/30" : "bg-slate-800 text-slate-400 border border-slate-700"}>
          {job.featured ? 'Featured' : 'Regular'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 mb-8 p-4 rounded-xl bg-slate-950/50 border border-slate-800/50 group-hover:border-primary-500/10 transition-colors">
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <MapPin className="w-4 h-4 text-primary-600" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <DollarSign className="w-4 h-4 text-primary-600" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Briefcase className="w-4 h-4 text-primary-600" />
          {job.type}
        </div>
        <div className="flex items-center gap-2 text-slate-400 text-sm">
          <Clock className="w-4 h-4 text-primary-600" />
          {job.postedAt}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {job.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-slate-300 rounded-lg text-xs font-medium tracking-wide">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-3 py-1.5 text-slate-500 text-xs font-medium">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <Link to={`/jobs/${job.id}`} className="block text-center w-full py-3.5 bg-slate-900 border border-slate-800 text-slate-300 font-bold rounded-xl group-hover:bg-gradient-to-r group-hover:from-primary-600 group-hover:to-amber-600 group-hover:border-transparent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-300 tracking-wide">
        View Details
      </Link>
    </div>
  );
};
