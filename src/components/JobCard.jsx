import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, DollarSign, Clock, Briefcase } from 'lucide-react';
import { Badge } from './ui/Badge';

export const JobCard = ({ job }) => {
  return (
    <div className="card-premium group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <img 
            src={job.companyLogo} 
            alt={job.company} 
            className="w-12 h-12 rounded-xl object-cover border border-slate-100"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/48'; }}
          />
          <div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-slate-500 text-sm">{job.company}</p>
          </div>
        </div>
        <Badge variant={job.featured ? 'primary' : 'default'}>
          {job.featured ? 'Featured' : 'Regular'}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-y-3 gap-x-2 mb-6">
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <MapPin className="w-4 h-4" />
          {job.location}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <DollarSign className="w-4 h-4" />
          {job.salary}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Briefcase className="w-4 h-4" />
          {job.type}
        </div>
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <Clock className="w-4 h-4" />
          {job.postedAt}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {job.skills.slice(0, 3).map(skill => (
          <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium">
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2 py-1 text-slate-400 text-xs font-medium">
            +{job.skills.length - 3} more
          </span>
        )}
      </div>

      <Link to={`/jobs/${job.id}`} className="block text-center w-full py-2.5 bg-slate-50 text-primary-600 font-semibold rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-200">
        View Details
      </Link>
    </div>
  );
};
