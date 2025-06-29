import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StepIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  backgroundColor: index < currentStep ? '#10B981' : index === currentStep ? '#4F46E5' : '#E2E8F0'
                }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold
                  ${index < currentStep ? 'bg-green-500 text-white' : 
                    index === currentStep ? 'bg-primary-500 text-white' : 
                    'bg-slate-300 text-slate-500'}
                `}
              >
                {index < currentStep ? (
                  <ApperIcon name="Check" className="h-5 w-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </motion.div>
              
              <div className="mt-3 text-center">
                <p className={`text-xs font-medium ${
                  index <= currentStep ? 'text-slate-800' : 'text-slate-500'
                }`}>
                  {step.title}
                </p>
                <p className={`text-xs mt-1 ${
                  index <= currentStep ? 'text-slate-600' : 'text-slate-400'
                }`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Connecting Line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-200 -z-10">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (totalSteps - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-green-500 to-primary-500"
          />
        </div>
      </div>
      
      {/* Current Step Info */}
      <div className="text-center">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-sm rounded-lg px-6 py-3 inline-block"
        >
          <p className="text-sm text-slate-600">
            Langkah {currentStep + 1} dari {totalSteps}
          </p>
          <h2 className="text-lg font-semibold text-slate-800 mt-1">
            {steps[currentStep]?.title}
          </h2>
        </motion.div>
      </div>
    </div>
  );
};

export default StepIndicator;