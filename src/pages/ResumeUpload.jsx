import React, { useState } from 'react';
import { api } from '../services/api';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import { Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export const ResumeUpload = () => {
  const { addToast } = useToast();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return addToast('Please select a file first', 'error');
    setUploading(true);
    try {
      await api.uploadResume(file);
      addToast('Resume uploaded successfully!');
    } catch (e) {
      addToast('Upload failed', 'error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-slate-900 mb-3">Upload Your Resume</h2>
        <p className="text-slate-500">Upload your latest CV to get better job matches and apply faster.</p>
      </div>

      <div className="bg-white p-10 rounded-3xl border-2 border-dashed border-slate-200 hover:border-primary-400 transition-all group text-center relative">
        {!file ? (
          <div className="space-y-6">
            <div className="w-20 h-20 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
              <Upload className="w-10 h-10" />
            </div>
            <div>
              <label className="cursor-pointer">
                <span className="text-lg font-semibold text-slate-900 hover:text-primary-600 transition-colors">Click to upload</span>
                <span className="text-slate-400 block mt-1">or drag and drop your file here</span>
                <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-xs text-slate-400">Accepted formats: PDF, DOC, DOCX (Max 5MB)</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
              <FileText className="w-12 h-12 text-primary-600" />
              <div className="text-left">
                <div className="font-bold text-slate-900 truncate max-w-xs">{file.name}</div>
                <div className="text-sm text-slate-500">{(file.size / 1024).toFixed(1)} KB</div>
              </div>
              <button onClick={() => setFile(null)} className="p-2 text-red-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
            <Button onClick={handleUpload} className="w-full py-4" disabled={uploading}>
              {uploading ? 'Uploading...' : 'Confirm Upload'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
