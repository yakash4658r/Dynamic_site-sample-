import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useToast } from '../components/ui/Toast';

export const Contact = () => {
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast('Message sent successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Get in Touch</h1>
        <p className="text-slate-600 max-w-2xl mx-auto">Have questions about our platform or need help with your job search? We're here to support you every step of the way.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm space-y-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" placeholder="Your name" required />
              <Input label="Email Address" type="email" placeholder="email@example.com" required />
            </div>
            <Input label="Subject" placeholder="How can we help?" required />
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Message</label>
              <textarea 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50/50 h-40" 
                placeholder="Write your message here..." 
                required
              />
            </div>
            <Button className="w-full py-4 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </Button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-primary-600 p-10 rounded-3xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-2xl"><Mail className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold">Email Us</div>
                  <div className="text-primary-100">support@jobportal.com</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-2xl"><Phone className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold">Call Us</div>
                  <div className="text-primary-100">+1 (555) 123-4567</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white/20 rounded-2xl"><MapPin className="w-6 h-6" /></div>
                <div>
                  <div className="font-bold">Visit Us</div>
                  <div className="text-primary-100">123 Tech Plaza, Silicon Valley, CA</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-sm h-64 relative overflow-hidden">
            <div className="absolute inset-0 bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 font-medium">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
