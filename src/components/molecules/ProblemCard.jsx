import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const ProblemCard = ({ problem, isSelected, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      onClick={onSelect}
      className={`
        relative cursor-pointer p-6 rounded-xl border-2 transition-all duration-200 card-hover
        ${isSelected 
          ? 'border-primary-500 bg-gradient-to-br from-primary-50 to-secondary-50 shadow-lg' 
          : 'border-slate-200 bg-white hover:border-primary-300 hover:shadow-md'
        }
      `}
    >
      {/* Selection Indicator */}
      <div className={`absolute top-4 right-4 w-6 h-6 rounded-full border-2 flex items-center justify-center
        ${isSelected ? 'border-primary-500 bg-primary-500' : 'border-slate-300'}
      `}>
        {isSelected && <ApperIcon name="Check" className="h-4 w-4 text-white" />}
      </div>
      
      {/* Problem Icon */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4
        ${isSelected 
          ? 'bg-gradient-to-br from-primary-500 to-secondary-500' 
          : 'bg-gradient-to-br from-slate-100 to-slate-200'
        }
      `}>
        <ApperIcon 
          name="AlertTriangle" 
          className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-slate-600'}`} 
        />
      </div>
      
      {/* Problem Content */}
      <h3 className={`font-semibold text-lg mb-3 ${isSelected ? 'text-primary-800' : 'text-slate-800'}`}>
        {problem.title}
      </h3>
      
      <p className={`text-sm leading-relaxed ${isSelected ? 'text-primary-700' : 'text-slate-600'}`}>
        {problem.description}
      </p>
      
      {/* Impact Indicator */}
      <div className="mt-4 flex items-center space-x-2">
        <div className={`flex space-x-1 ${isSelected ? 'text-primary-600' : 'text-slate-400'}`}>
          {[1, 2, 3, 4, 5].map((star) => (
            <ApperIcon 
              key={star}
              name={star <= problem.severity ? "Star" : "Star"} 
              className={`h-4 w-4 ${star <= problem.severity ? 'fill-current' : ''}`}
            />
          ))}
        </div>
        <span className="text-xs text-slate-500 font-medium">Tingkat Urgensi</span>
      </div>
    </motion.div>
  );
};

export default ProblemCard;