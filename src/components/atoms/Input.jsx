import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label, 
  error, 
  icon, 
  helper, 
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="h-5 w-5 text-slate-400" />
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 placeholder-slate-500
            focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none
            transition-colors duration-200
            ${icon ? 'pl-10' : ''}
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <ApperIcon name="AlertCircle" className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
      
      {helper && !error && (
        <p className="mt-2 text-sm text-slate-500">{helper}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;