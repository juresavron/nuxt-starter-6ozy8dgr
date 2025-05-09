import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ExternalLink, Instagram, Facebook, Linkedin, Twitter, Youtube, Globe } from 'lucide-react';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import Button from '../../shared/Button';

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    url: string;
    completed: boolean;
  };
  isCompleted: boolean;
  onComplete: () => void;
  colorScheme?: string;
  index: number;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  isCompleted,
  onComplete,
  colorScheme = 'indigo',
  index
}) => {
  const translations = useTranslations();
  
  // Get icon based on task title
  const getTaskIcon = () => {
    const title = task.title.toLowerCase();
    
    if (title.includes('instagram')) return <Instagram className="h-5 w-5" />;
    if (title.includes('facebook')) return <Facebook className="h-5 w-5" />;
    if (title.includes('linkedin')) return <Linkedin className="h-5 w-5" />;
    if (title.includes('twitter') || title.includes('x.com')) return <Twitter className="h-5 w-5" />;
    if (title.includes('youtube')) return <Youtube className="h-5 w-5" />;
    if (title.includes('google')) return <Globe className="h-5 w-5" />;
    
    return <Globe className="h-5 w-5" />;
  };
  
  // Get button color based on color scheme
  const getButtonColor = () => {
    if (isCompleted) return 'secondary';
    
    switch (colorScheme) {
      case 'amber': return 'amber';
      case 'emerald': return 'emerald';
      case 'rose': return 'rose';
      case 'bw': return 'gray';
      default: return 'primary';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
      className={cn(
        "p-4 sm:p-5 rounded-xl border shadow-sm transition-all duration-300",
        isCompleted 
          ? colorScheme === 'amber' ? 'bg-amber-50/50 border-amber-100' :
            colorScheme === 'emerald' ? 'bg-emerald-50/50 border-emerald-100' :
            colorScheme === 'rose' ? 'bg-rose-50/50 border-rose-100' :
            colorScheme === 'bw' ? 'bg-gray-50/50 border-gray-200' :
            'bg-indigo-50/50 border-indigo-100'
          : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            isCompleted
              ? colorScheme === 'amber' ? 'bg-amber-100 text-amber-600' :
                colorScheme === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                colorScheme === 'rose' ? 'bg-rose-100 text-rose-600' :
                colorScheme === 'bw' ? 'bg-gray-200 text-gray-700' :
                'bg-indigo-100 text-indigo-600'
              : 'bg-gray-100 text-gray-500'
          )}>
            {isCompleted ? <CheckCircle className="h-5 w-5" /> : getTaskIcon()}
          </div>
          <div>
            <h3 className="text-base font-medium text-gray-900">{task.title}</h3>
            <p className="text-sm text-gray-500 truncate max-w-[200px] sm:max-w-[300px]">
              {task.url}
            </p>
          </div>
        </div>
        
        <Button
          variant={getButtonColor()}
          size="sm"
          onClick={() => {
            if (!isCompleted) {
              // Open URL in new tab
              window.open(task.url, '_blank');
              // Mark as completed
              onComplete();
            }
          }}
          rightIcon={isCompleted ? <CheckCircle className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
          disabled={isCompleted}
        >
          {isCompleted 
            ? translations?.gamification?.tasks?.completed || 'Completed'
            : translations?.gamification?.tasks?.startTask || 'Start Task'}
        </Button>
      </div>
    </motion.div>
  );
};

export default TaskItem;