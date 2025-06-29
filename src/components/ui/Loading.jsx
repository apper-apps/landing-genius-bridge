import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const Loading = ({ message = "Sedang memuat...", type = "default" }) => {
  if (type === "wizard") {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mb-6"
        >
          <ApperIcon name="Zap" className="h-8 w-8 text-white" />
        </motion.div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">AI Sedang Bekerja...</h3>
        <p className="text-slate-600 text-center max-w-md">{message}</p>
        
        {/* Progress dots */}
        <div className="flex space-x-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, delay: i * 0.2, repeat: Infinity }}
              className="w-2 h-2 bg-primary-400 rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="animate-pulse">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <div className="h-6 bg-slate-200 rounded-lg w-3/4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-slate-200 rounded w-full"></div>
            <div className="h-4 bg-slate-200 rounded w-5/6"></div>
          </div>
          <div className="h-10 bg-slate-200 rounded-lg w-1/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary-200 border-t-primary-500 rounded-full mb-4"
      />
      <p className="text-slate-600 text-sm">{message}</p>
    </div>
  );
};

export default Loading;