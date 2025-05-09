import React from 'react';
import { motion } from 'framer-motion';
import TaskItem from './TaskItem';
import { cn } from '../../../utils/cn';
import { useTranslations } from '../../../hooks/useTranslations';
import CompletedTasksMessage from '../../shared/CompletedTasksMessage';

interface TaskListProps {
  tasks: {
    id: string;
    title: string;
    url: string;
    completed: boolean;
  }[];
  completedTasks: string[];
  onTaskComplete: (taskId: string) => void;
  colorScheme?: string;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  completedTasks,
  onTaskComplete,
  colorScheme = 'indigo'
}) => {
  const translations = useTranslations();
  
  // Check if all tasks are completed
  const allCompleted = tasks.every(task => task.completed || completedTasks.includes(task.id));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mb-8"
    >
      <h2 className={cn(
        "text-lg font-semibold mb-4",
        colorScheme === 'amber' ? 'text-amber-700' :
        colorScheme === 'emerald' ? 'text-emerald-700' :
        colorScheme === 'rose' ? 'text-rose-700' :
        colorScheme === 'bw' ? 'text-gray-800' :
        'text-indigo-700'
      )}>
        {translations?.gamification?.tasks?.title || 'Complete Tasks'}
      </h2>
      
      {allCompleted ? (
        <CompletedTasksMessage colorScheme={colorScheme} />
      ) : (
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              isCompleted={task.completed || completedTasks.includes(task.id)}
              onComplete={() => onTaskComplete(task.id)}
              colorScheme={colorScheme}
              index={index}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TaskList;