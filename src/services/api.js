import { mockJobs } from '../data/mockJobs';
import { mockCandidates, mockEmployers } from '../data/mockUsers';
import { mockApplications } from '../data/mockApplications';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Job services
  async getJobs(filters = {}) {
    await sleep(800);
    let jobs = [...mockJobs];
    if (filters.search) {
      const search = filters.search.toLowerCase();
      jobs = jobs.filter(j => j.title.toLowerCase().includes(search) || j.company.toLowerCase().includes(search));
    }
    if (filters.category) {
      jobs = jobs.filter(j => j.category === filters.category);
    }
    if (filters.type) {
      jobs = jobs.filter(j => j.type === filters.type);
    }
    return jobs;
  },

  async getJobById(id) {
    await sleep(500);
    const job = mockJobs.find(j => j.id === id);
    if (!job) throw new Error('Job not found');
    return job;
  },

  // Auth services
  async login(credentials) {
    await sleep(1000);
    const { email, role } = credentials;
    if (role === 'candidate') {
      const user = mockCandidates.find(u => u.email === email);
      if (user) return { user, role: 'candidate', token: 'fake-jwt-candidate' };
    } else {
      const user = mockEmployers.find(u => u.email === email);
      if (user) return { user, role: 'employer', token: 'fake-jwt-employer' };
    }
    throw new Error('Invalid credentials');
  },

  async register(userData) {
    await sleep(1000);
    return { success: true, user: userData };
  },

  // Application services
  async applyToJob(applicationData) {
    await sleep(1000);
    const newApp = {
      id: `app${mockApplications.length + 1}`,
      ...applicationData,
      status: 'Applied',
      appliedAt: new Date().toISOString(),
    };
    mockApplications.push(newApp);
    return newApp;
  },

  async getMyApplications(candidateId) {
    await sleep(800);
    return mockApplications.filter(app => app.candidateId === candidateId).map(app => ({
      ...app,
      job: mockJobs.find(j => j.id === app.jobId)
    }));
  },

  async uploadResume(file) {
    await sleep(2000);
    return { success: true, url: `/resumes/${file.name}` };
  },

  // Employer services
  async getEmployerJobs(employerId) {
    await sleep(800);
    return mockJobs.filter(j => {
      const employer = mockEmployers.find(e => e.id === employerId);
      return j.company === employer?.companyName;
    });
  },

  async postJob(jobData) {
    await sleep(1000);
    const newJob = {
      id: `${mockJobs.length + 1}`,
      ...jobData,
      postedAt: 'Just now',
    };
    mockJobs.push(newJob);
    return newJob;
  },

  async getApplicants(jobId) {
    await sleep(800);
    const apps = mockApplications.filter(app => app.jobId === jobId);
    return apps.map(app => ({
      ...app,
      candidate: mockCandidates.find(c => c.id === app.candidateId)
    }));
  },

  async updateApplicationStatus(appId, status) {
    await sleep(500);
    const app = mockApplications.find(a => a.id === appId);
    if (app) app.status = status;
    return { success: true };
  }
};
