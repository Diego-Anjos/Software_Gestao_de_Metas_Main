import React, { useState, useEffect } from 'react';
import { Habit } from '../types';
import { CloseIcon } from './icons/Icons';

interface EditHabitModalProps {
  habit: Habit;
  onClose: () => void;
  onUpdateHabit: (habit: Habit) => void;
}

const EditHabitModal: React.FC<EditHabitModalProps> = ({ habit, onClose, onUpdateHabit }) => {
  const [name, setName] = useState(habit.name);

  useEffect(() => {
    setName(habit.name);
  }, [habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onUpdateHabit({
      ...habit,
      name: name.trim(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 w-full max-w-md p-6 relative animate-fade-in-up shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Editar Hábito</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Hábito</label>
            <input 
              type="text" 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Ex: Ler por 15 minutos"
            />
          </div>
          <div className="flex justify-end pt-2 space-x-3">
            <button type="button" onClick={onClose} className="bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-800 dark:text-white font-semibold py-2 px-4 rounded-lg">Cancelar</button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">Salvar Alterações</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHabitModal;
