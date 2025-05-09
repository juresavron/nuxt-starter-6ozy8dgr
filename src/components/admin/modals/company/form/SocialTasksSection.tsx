import React from 'react';
import { X, Plus } from 'lucide-react';
import Button from '../../../../shared/Button';
import { useTranslations } from '../../../../../hooks/useTranslations';

export interface SocialTask {
  platform: string;
  url: string;
}

interface SocialTasksSectionProps {
  tasks: SocialTask[];
  onAddTask: () => void;
  onRemoveTask: (index: number) => void;
  onUpdateTask: (index: number, field: 'platform' | 'url', value: string) => void;
  disabled?: boolean;
}

/**
 * Component for managing social media tasks
 */
const SocialTasksSection: React.FC<SocialTasksSectionProps> = ({
  tasks,
  onAddTask,
  onRemoveTask,
  onUpdateTask,
  disabled = false
}) => {
  const translations = useTranslations();
  const t = translations?.app?.admin?.company?.socialTasks || {};
  
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <label className="block text-sm font-medium text-gray-700">
          {t?.title || 'Družbena omrežja'}
        </label>
        <Button 
          variant="secondary"
          size="sm"
          onClick={onAddTask}
          type="button"
          disabled={disabled}
          leftIcon={<Plus className="h-4 w-4" />}
        >
          {t?.add || 'Dodaj platformo'}
        </Button>
      </div>
      
      {tasks.map((task, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <div className="flex-1">
            <input
              type="text"
              value={task.platform}
              onChange={(e) => onUpdateTask(index, 'platform', e.target.value)}
              className="input-field"
              placeholder={t?.platformPlaceholder || "Platforma (npr. Instagram, Facebook)"}
              disabled={disabled}
            />
          </div>
          <div className="flex-1">
            <input
              type="url"
              value={task.url}
              onChange={(e) => onUpdateTask(index, 'url', e.target.value)}
              className="input-field"
              placeholder={t?.urlPlaceholder || "URL (npr. https://instagram.com/...)"}
              disabled={disabled}
            />
          </div>
          <Button 
            variant="danger"
            size="sm"
            onClick={() => onRemoveTask(index)}
            type="button"
            disabled={disabled || tasks.length <= 1}
            className="mt-1"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
};

export default React.memo(SocialTasksSection);