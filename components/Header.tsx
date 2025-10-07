import React from 'react';
import { PlusIcon, SparklesIcon, MoonIcon, SunIcon } from './icons/Icons';

interface HeaderProps {
    onNewHabitClick: () => void;
    onNewGoalClick: () => void;
    onToggleTheme: () => void;
    theme: string;
}

const Header: React.FC<HeaderProps> = ({ onNewHabitClick, onNewGoalClick, onToggleTheme, theme }) => {
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <div className="flex items-center space-x-3">
        <div className="bg-gradient-to-br from-teal-400 to-blue-500 p-2 rounded-lg">
           <SparklesIcon className="w-7 h-7 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">Gestor de Metas IA</h1>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleTheme}
          className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-200 font-semibold p-2.5 rounded-lg transition-colors duration-200"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
        </button>
        <button 
          onClick={onNewHabitClick}
          className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Novo Hábito</span>
        </button>
        <button 
          onClick={onNewGoalClick}
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Nova Meta</span>
        </button>
      </div>
    </header>
  );
};

export default Header;