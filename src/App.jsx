import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardLayout } from './layouts/DashboardLayout';
import { AuthLayout } from './layouts/AuthLayout';

import { Home } from './pages/Home';
import { JobListings } from './pages/JobListings';
import { JobDetails } from './pages/JobDetails';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CandidateDashboard } from './pages/CandidateDashboard';
import { CandidateProfile } from './pages/CandidateProfile';
import { ResumeUpload } from './pages/ResumeUpload';
import { EmployerDashboard } from './pages/EmployerDashboard';
import { PostJob } from './pages/PostJob';
import { ManageJobs } from './pages/ManageJobs';
import { Applicants } from './pages/Applicants';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const savedRole = localStorage.getItem('role');
    if (savedUser && savedRole) {
      setUser(JSON.parse(savedUser));
      setRole(savedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    setUser(null);
    setRole(null);
  };

  return (
    <ToastProvider>
      <BrowserRouter basename="/Dynamic_site-sample-/">
        <div className="flex flex-col min-h-screen">
          <Navbar user={user} role={role} onLogout={handleLogout} />
          
          <div className="flex-1">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/jobs" element={<JobListings />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Candidate Protected Routes */}
              <Route 
                path="/candidate/*" 
                element={
                  user && role === 'candidate' ? (
                    <DashboardLayout user={user} role={role} onLogout={handleLogout}>
                      <Routes>
                        <Route path="dashboard" element={<CandidateDashboard user={user} />} />
                        <Route path="profile" element={<CandidateProfile user={user} />} />
                        <Route path="resume" element={<ResumeUpload />} />
                        <Route path="*" element={<Navigate to="/candidate/dashboard" />} />
                      </Routes>
                    </DashboardLayout>
                  ) : (
                    <Navigate to="/login" />
                  )
                } 
              />

              {/* Employer Protected Routes */}
              <Route 
                path="/employer/*" 
                element={
                  user && role === 'employer' ? (
                    <DashboardLayout user={user} role={role} onLogout={handleLogout}>
                      <Routes>
                        <Route path="dashboard" element={<EmployerDashboard user={user} />} />
                        <Route path="post-job" element={<PostJob />} />
                        <Route path="manage-jobs" element={<ManageJobs user={user} />} />
                        <Route path="applicants" element={<Applicants />} />
                        <Route path="*" element={<Navigate to="/employer/dashboard" />} />
                      </Routes>
                    </DashboardLayout>
                  ) : (
                    <Navigate to="/login" />
                  )
                } 
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          
          <Footer />
        </div>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
