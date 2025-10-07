import React, { useState, useEffect } from 'react';
import { Goal } from '../types';
import { CloseIcon } from './icons/Icons';

interface EditGoalModalProps {
  goal: Goal;
  onClose: () => void;
  onUpdateGoal: (goal: Goal) => void;
}

const EditGoalModal: React.FC<EditGoalModalProps> = ({ goal, onClose, onUpdateGoal }) => {
  const [title, setTitle] = useState(goal.title);
  const [description, setDescription] = useState(goal.description);
  const [category, setCategory] = useState(goal.category);
  const [deadline, setDeadline] = useState(goal.deadline);

  useEffect(() => {
    setTitle(goal.title);
    setDescription(goal.description);
    setCategory(goal.category);
    setDeadline(goal.deadline);
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !deadline) return;
    onUpdateGoal({
      ...goal,
      title,
      description,
      category,
      deadline,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-700 w-full max-w-md p-6 relative animate-fade-in-up shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white">
          <CloseIcon className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Editar Meta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Título</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500" />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
              <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prazo</label>
              <input type="date" id="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required className="w-full bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-white rounded-md border-slate-300 dark:border-slate-600 focus:ring-blue-500 focus:border-blue-500" />
            </div>
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

export default EditGoalModal;
