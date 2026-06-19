import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';

export const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <h1 className="text-9xl font-black text-slate-200 absolute -top-20 left-1/2 -translate-x-1/2 -z-10">404</h1>
        <div className="text-6xl mb-8">🚀</div>
      </motion.div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Lost in Space?</h2>
      <p className="text-slate-500 mb-10 max-w-md">The page you're looking for doesn't exist or has been moved to another galaxy.</p>
      <Link to="/">
        <Button className="px-8 py-3">Back to Home</Button>
      </Link>
    </div>
  );
};
