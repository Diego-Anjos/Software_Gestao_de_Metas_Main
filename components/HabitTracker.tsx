import React from 'react';
import { Habit } from '../types';
import { CheckListIcon, TrashIcon, EditIcon, CheckIcon } from './icons/Icons';

interface HabitTrackerProps {
  habits: Habit[];
  onToggleDay: (id: number, dayIndex: number) => void;
  onDelete: (id: number) => void;
  onEdit: (habit: Habit) => void;
}

const weekDays = ['qua', 'qui', 'sex', 'sáb', 'dom', 'seg', 'ter'];

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onToggleDay, onDelete, onEdit }) => {
  return (
    <section>
      <div className="flex items-center space-x-3 mb-6">
        <CheckListIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Rastreador de Hábitos</h2>
      </div>
      <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg p-4 rounded-2xl border border-slate-300/30 dark:border-slate-700/50 shadow-sm">
        <div className="grid grid-cols-10 gap-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400 mb-3 px-2">
            <div className="col-span-2 text-left">Hábito</div>
            {weekDays.map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                    <p>{day.toUpperCase()}</p>
                    <p className="font-normal text-slate-400">{index + 1}</p>
                </div>
            ))}
            <div></div>
        </div>
        <div className="space-y-2">
            {habits.map(habit => (
                <div key={habit.id} className="grid grid-cols-10 gap-2 items-center bg-white/0 dark:bg-slate-800/0 hover:bg-slate-100/70 dark:hover:bg-slate-700/50 p-2 rounded-md transition-colors duration-200 group">
                    <p className="col-span-2 text-sm text-slate-800 dark:text-slate-200 truncate pr-2">{habit.name}</p>
                    {habit.completedDays.map((isCompleted, dayIndex) => (
                        <div key={dayIndex} className="flex justify-center">
                            <button
                                onClick={() => onToggleDay(habit.id, dayIndex)}
                                className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 ${isCompleted ? 'bg-green-500 hover:bg-green-600' : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600'}`}
                                aria-label={`Mark ${habit.name} for day ${dayIndex + 1} as ${isCompleted ? 'incomplete' : 'complete'}`}
                            >
                                <CheckIcon className={`w-5 h-5 text-white transition-transform duration-200 ease-in-out ${isCompleted ? 'scale-100' : 'scale-0'}`} />
                            </button>
                        </div>
                    ))}
                    <div className="flex justify-center space-x-2">
                        <button onClick={() => onEdit(habit)} className="text-slate-400 hover:text-blue-500 transition-colors duration-200 opacity-0 group-hover:opacity-100" aria-label="Edit habit">
                            <EditIcon className="w-4 h-4" />
                        </button>
                        <button onClick={() => onDelete(habit.id)} className="text-slate-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100" aria-label="Delete habit">
                            <TrashIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            ))}
             {habits.length === 0 && (
                <div className="text-center py-6">
                    <p className="text-slate-500 dark:text-slate-400">Nenhum hábito adicionado.</p>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default HabitTracker;