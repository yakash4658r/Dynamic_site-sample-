import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';
import { Camera, Save } from 'lucide-react';

export const CandidateProfile = ({ user }) => {
  const { addToast } = useToast();
  const [profile, setProfile] = useState(user || {});

  const handleSave = () => {
    addToast('Profile updated successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center gap-8 mb-10">
          <div className="relative group">
            <img src={user?.profilePic || 'https://via.placeholder.com/150'} alt="profile" className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-lg" />
            <button className="absolute -bottom-2 -right-2 p-2 bg-primary-600 text-white rounded-xl shadow-lg hover:scale-110 transition-all">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">{user?.name}</h2>
            <p className="text-slate-500 mb-4">{user?.email} • {user?.phone}</p>
            <Badge variant="secondary">{user?.experience} Experience</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Full Name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} />
          <Input label="Email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} />
          <Input label="Phone" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} />
          <Input label="Education" value={profile.education} onChange={e => setProfile({...profile, education: e.target.value})} />
          <div className="md:col-span-2">
            <label className="text-sm font-semibold text-slate-700 mb-3 block">Professional Bio</label>
            <textarea 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none transition-all bg-slate-50/50 h-32"
              value={profile.bio}
              onChange={e => setProfile({...profile, bio: e.target.value})}
            />
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

import { Badge } from '../components/ui/Badge';
