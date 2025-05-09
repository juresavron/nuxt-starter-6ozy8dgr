import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGamification } from '../context/GamificationContext';

interface BackNavigationWarningProps {
  colorScheme?: string;
}

const BackNavigationWarning: React.FC<BackNavigationWarningProps> = ({
  colorScheme = 'indigo'
}) => {
  const [showModal, setShowModal] = useState(false);
  const { completedTasks, tasks } = useGamification();
  const navigate = useNavigate();

  // Prevent back navigation if there are completed tasks
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (completedTasks.length > 0 && completedTasks.length < tasks.length) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };
    
    const handlePopState = (e: PopStateEvent) => {
      if (completedTasks.length > 0 && completedTasks.length < tasks.length) {
        e.preventDefault();
        setShowModal(true);
        window.history.pushState(null, '', window.location.href);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('popstate', handlePopState);
    window.history.pushState(null, '', window.location.href);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [completedTasks, tasks]);

  // Modal component for back navigation warning
  if (!showModal) return null;
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            colorScheme === 'amber' ? 'bg-amber-100 text-amber-600' :
            colorScheme === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
            colorScheme === 'rose' ? 'bg-rose-100 text-rose-600' :
            colorScheme === 'bw' ? 'bg-gray-100 text-gray-700' :
            'bg-indigo-100 text-indigo-600'
          }`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Are you sure you want to leave?</h3>
        </div>
        
        <p className="text-gray-600 mb-6">
          You have unfinished tasks. If you leave now, your progress will be lost.
        </p>
        
        <div className="flex gap-3">
          <button
            onClick={() => setShowModal(false)}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Stay on Page
          </button>
          <button
            onClick={() => navigate('/home')}
            className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors ${
              colorScheme === 'amber' ? 'bg-amber-500 hover:bg-amber-600' :
              colorScheme === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' :
              colorScheme === 'rose' ? 'bg-rose-500 hover:bg-rose-600' :
              colorScheme === 'bw' ? 'bg-gray-700 hover:bg-gray-800' :
              'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            Leave Anyway
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackNavigationWarning;