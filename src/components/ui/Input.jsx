import React from 'react';

export const Input = ({ label, error, ...props }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && <label className="text-sm font-medium text-slate-700 ml-1">{label}</label>}
      <input className="input-field" {...props} />
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};
