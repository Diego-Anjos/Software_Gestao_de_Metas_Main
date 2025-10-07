import React from 'react';
import { Goal } from '../types';
import GoalCard from './GoalCard';
import { TargetIcon } from './icons/Icons';

interface GoalListProps {
  goals: Goal[];
  onUpdateProgress: (id: number, progress: number) => void;
  onDelete: (id: number) => void;
  onEdit: (goal: Goal) => void;
  onTogglePriority: (id: number) => void;
}

const GoalList: React.FC<GoalListProps> = ({ goals, onUpdateProgress, onDelete, onEdit, onTogglePriority }) => {
  return (
    <section>
      <div className="flex items-center space-x-3 mb-6">
        <TargetIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Metas Atuais</h2>
      </div>
      {goals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map(goal => (
            <GoalCard 
              key={goal.id} 
              goal={goal} 
              onUpdateProgress={onUpdateProgress}
              onDelete={onDelete}
              onEdit={onEdit}
              onTogglePriority={onTogglePriority}
            />
          ))}
        </div>
      ) : (
         <div className="text-center py-10 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-slate-500 dark:text-slate-400">Nenhuma meta adicionada ainda.</p>
            <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Clique em "Nova Meta" para começar.</p>
        </div>
      )}
    </section>
  );
};

export default GoalList;