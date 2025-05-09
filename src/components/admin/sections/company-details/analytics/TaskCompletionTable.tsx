import React from 'react';
import { cn } from '../../../../../utils/cn';

interface TaskStat {
  name: string;
  count: number;
  percentage: number;
}

interface TaskCompletionTableProps {
  taskStats: TaskStat[];
  colorScheme?: string;
}

/**
 * Table displaying detailed task completion statistics
 */
const TaskCompletionTable: React.FC<TaskCompletionTableProps> = ({
  taskStats,
  colorScheme = 'blue'
}) => {
  if (taskStats.length === 0) {
    return null;
  }

  // Get progress bar color based on color scheme
  const getProgressBarColor = () => {
    switch (colorScheme) {
      case 'amber': return 'bg-amber-500';
      case 'emerald': return 'bg-emerald-500';
      case 'rose': return 'bg-rose-500';
      case 'bw': return 'bg-gray-700';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="mt-6">
      <h4 className="text-lg font-medium text-gray-900 mb-4">Podrobnosti dokončanja nalog</h4>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Naloga
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Dokončanja
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Odstotek
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {taskStats.map((stat, index) => (
              <tr key={stat.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {stat.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {stat.count}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2 max-w-[200px]">
                      <div 
                        className={cn(
                          "h-2.5 rounded-full",
                          getProgressBarColor()
                        )}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span>{stat.percentage}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskCompletionTable;