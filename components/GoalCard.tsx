import React from 'react';
import { Goal } from '../types';
import { CalendarIcon, EditIcon, StarIcon, TagIcon, TrashIcon } from './icons/Icons';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (id: number, progress: number) => void;
  onDelete: (id: number) => void;
  onEdit: (goal: Goal) => void;
  onTogglePriority: (id: number) => void;
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  const getGradient = (p: number) => {
    if (p < 50) return 'from-yellow-400 to-orange-500';
    return 'from-green-400 to-teal-500';
  };

  return (
    <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-2.5">
      <div
        className={`bg-gradient-to-r ${getGradient(progress)} h-2.5 rounded-full transition-all duration-500`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};


const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdateProgress, onDelete, onEdit, onTogglePriority }) => {
    const formattedDate = new Date(goal.deadline + 'T00:00:00').toLocaleDateString('pt-BR');
    const priorityClass = goal.priority 
        ? 'border-amber-400/60' 
        : 'border-slate-300/30 dark:border-slate-700/50';

    return (
    <div className={`bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg p-5 rounded-2xl border ${priorityClass} flex flex-col justify-between h-full transition-all duration-300 shadow-sm hover:shadow-xl hover:scale-[1.02] hover:border-slate-400/50 dark:hover:border-slate-600/50`}>
      <div>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-1">{goal.title}</h3>
          <div className="flex items-center space-x-3 text-slate-500 dark:text-slate-400">
            <button onClick={() => onTogglePriority(goal.id)} className={`transition-colors duration-200 ${goal.priority ? 'text-amber-400 hover:text-amber-500' : 'hover:text-amber-400'}`} aria-label="Toggle priority">
              <StarIcon className={`w-5 h-5`} fill={goal.priority ? 'currentColor' : 'none'} />
            </button>
            <button onClick={() => onEdit(goal)} className="hover:text-blue-500 transition-colors duration-200" aria-label="Edit goal"><EditIcon className="w-4 h-4" /></button>
            <button onClick={() => onDelete(goal.id)} className="hover:text-red-500 transition-colors duration-200" aria-label="Delete goal"><TrashIcon className="w-4 h-4" /></button>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{goal.description}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500 dark:text-slate-400 mb-4">
          <div className="flex items-center space-x-1.5">
            <TagIcon className="w-3.5 h-3.5" />
            <span>{goal.category}</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Prazo: {formattedDate}</span>
          </div>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
            <label htmlFor={`progress-${goal.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-300">Progresso</label>
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{goal.progress}%</span>
        </div>
        <ProgressBar progress={goal.progress} />
        <input
            id={`progress-${goal.id}`}
            type="range"
            min="0"
            max="100"
            value={goal.progress}
            onChange={(e) => onUpdateProgress(goal.id, parseInt(e.target.value))}
            className="w-full h-2 bg-transparent cursor-pointer appearance-none focus:outline-none [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-teal-400 mt-1"
        />
      </div>
    </div>
  );
};

export default GoalCard;