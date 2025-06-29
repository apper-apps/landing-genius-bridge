import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Error = ({ 
  message = "Terjadi kesalahan", 
  description = "Mohon coba lagi dalam beberapa saat",
  onRetry,
  type = "default"
}) => {
  if (type === "wizard") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-6">
          <ApperIcon name="AlertTriangle" className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-800 mb-2">{message}</h3>
        <p className="text-slate-600 text-center max-w-md mb-8">{description}</p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="btn-animate bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-primary-600 hover:to-secondary-600 transition-all duration-200 flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="h-4 w-4" />
            <span>Coba Lagi</span>
          </button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-red-200 p-6"
    >
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <ApperIcon name="AlertCircle" className="h-5 w-5 text-red-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-slate-800 mb-1">{message}</h3>
          <p className="text-slate-600 text-sm mb-4">{description}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center space-x-1"
            >
              <ApperIcon name="RefreshCw" className="h-4 w-4" />
              <span>Coba Lagi</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Error;