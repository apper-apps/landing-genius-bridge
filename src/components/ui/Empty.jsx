import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Empty = ({ 
  title = "Belum ada data", 
  description = "Data akan muncul di sini setelah Anda menambahkannya",
  icon = "Inbox",
  actionLabel,
  onAction,
  type = "default"
}) => {
  if (type === "dashboard") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} className="h-12 w-12 text-slate-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 max-w-md mx-auto mb-8">{description}</p>
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="btn-animate bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 inline-flex items-center space-x-2"
          >
            <ApperIcon name="Plus" className="h-4 w-4" />
            <span>{actionLabel}</span>
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-slate-200 p-8 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={icon} className="h-8 w-8 text-slate-400" />
      </div>
      
      <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm mb-6">{description}</p>
      
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-sm font-medium text-primary-600 hover:text-primary-700 inline-flex items-center space-x-1"
        >
          <ApperIcon name="Plus" className="h-4 w-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </motion.div>
  );
};

export default Empty;