import React, { useState, useEffect } from 'react';
import { Goal, Habit } from './types';
import Header from './components/Header';
import GoalList from './components/GoalList';
import AIAssistant from './components/AIAssistant';
import ProgressChart from './components/ProgressChart';
import HabitTracker from './components/HabitTracker';
import AddGoalModal from './components/AddGoalModal';
import AddHabitModal from './components/AddHabitModal';
import EditGoalModal from './components/EditGoalModal';
import EditHabitModal from './components/EditHabitModal';

// Confetti is loaded from CDN, declare it on window
declare global {
  interface Window {
    confetti: any;
  }
}

const App: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [
    {
      id: 1,
      title: 'Aprender React com TypeScript',
      description: 'Concluir um curso e criar 2 projetos pessoais.',
      category: 'Desenvolvimento Pessoal',
      deadline: '2024-12-30',
      progress: 45,
      priority: true,
    },
    {
      id: 2,
      title: 'Correr 5km',
      description: 'Treinar 3 vezes por semana para a corrida de fim de ano.',
      category: 'Saúde',
      deadline: '2024-11-19',
      progress: 75,
      priority: false,
    },
    {
      id: 3,
      title: 'Ler 12 Livros',
      description: 'Ler um livro por mês durante o ano.',
      category: 'Lazer',
      deadline: '2024-12-30',
      progress: 80,
      priority: false,
    },
  ]});

  const [habits, setHabits] = useState<Habit[]>(() => {
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [
      { id: 1, name: 'Meditar 10 minutos', completedDays: [true, false, true, false, true, false, false] },
      { id: 2, name: 'Beber 2L de água', completedDays: [true, true, true, true, false, true, true] },
      { id: 3, name: 'Estudar por 1 hora', completedDays: [true, true, false, true, false, false, false] },
  ]});

  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === 'dark') {
      html.classList.add('dark');
      html.classList.remove('light');
    } else {
      html.classList.remove('dark');
      html.classList.add('light');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleUpdateGoalProgress = (id: number, progress: number) => {
    const goal = goals.find(g => g.id === id);
    if (goal && goal.progress < 100 && progress === 100) {
      triggerConfetti();
    }
    setGoals(goals.map(goal => (goal.id === id ? { ...goal, progress } : goal)));
  };

  const handleDeleteGoal = (id: number) => setGoals(goals.filter(goal => goal.id !== id));

  const handleAddGoal = (goal: Omit<Goal, 'id' | 'priority'>) => {
    const newGoal: Goal = { ...goal, id: Date.now(), priority: false };
    setGoals([...goals, newGoal]);
    setIsGoalModalOpen(false);
  };

  const handleUpdateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    setEditingGoal(null);
  }

  const handleToggleGoalPriority = (id: number) => {
    setGoals(goals.map(goal => goal.id === id ? { ...goal, priority: !goal.priority } : goal));
  }
  
  const handleToggleHabitDay = (id: number, dayIndex: number) => {
    setHabits(habits.map(habit => {
        if (habit.id === id) {
            const newCompletedDays = [...habit.completedDays];
            newCompletedDays[dayIndex] = !newCompletedDays[dayIndex];
            return { ...habit, completedDays: newCompletedDays };
        }
        return habit;
    }));
  };

  const handleDeleteHabit = (id: number) => setHabits(habits.filter(habit => habit.id !== id));

  const handleAddHabit = (habitName: string) => {
    const newHabit: Habit = { id: Date.now(), name: habitName, completedDays: Array(7).fill(false) };
    setHabits([...habits, newHabit]);
    setIsHabitModalOpen(false);
  };
  
  const handleUpdateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => habit.id === updatedHabit.id ? updatedHabit : habit));
    setEditingHabit(null);
  }

  const sortedGoals = [...goals].sort((a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
       <div className="fixed inset-0 -z-10 h-full w-full bg-white dark:bg-slate-900 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      
      <div className="max-w-screen-2xl mx-auto animate-fade-in">
        <Header 
          onNewGoalClick={() => setIsGoalModalOpen(true)}
          onNewHabitClick={() => setIsHabitModalOpen(true)}
          onToggleTheme={handleToggleTheme}
          theme={theme}
        />
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <GoalList 
              goals={sortedGoals} 
              onUpdateProgress={handleUpdateGoalProgress}
              onDelete={handleDeleteGoal}
              onEdit={setEditingGoal}
              onTogglePriority={handleToggleGoalPriority}
            />
            <HabitTracker 
              habits={habits}
              onToggleDay={handleToggleHabitDay}
              onDelete={handleDeleteHabit}
              onEdit={setEditingHabit}
            />
          </div>
          <div className="lg:col-span-1 space-y-8">
            <AIAssistant goals={goals} habits={habits} />
            <ProgressChart goals={goals} />
          </div>
        </main>
      </div>
      {isGoalModalOpen && <AddGoalModal onClose={() => setIsGoalModalOpen(false)} onAddGoal={handleAddGoal} />}
      {isHabitModalOpen && <AddHabitModal onClose={() => setIsHabitModalOpen(false)} onAddHabit={handleAddHabit} />}
      {editingGoal && <EditGoalModal goal={editingGoal} onClose={() => setEditingGoal(null)} onUpdateGoal={handleUpdateGoal} />}
      {editingHabit && <EditHabitModal habit={editingHabit} onClose={() => setEditingHabit(null)} onUpdateHabit={handleUpdateHabit} />}
    </div>
  );
};

export default App;