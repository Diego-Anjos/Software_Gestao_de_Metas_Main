import React, { useState, useEffect } from 'react';
import { getAISuggestion, getAIGoalIdeas } from '../services/geminiService';
import { Goal, Habit } from '../types';
import { SparklesIcon, WandIcon, LightBulbIcon } from './icons/Icons';

interface AIAssistantProps {
  goals: Goal[];
  habits: Habit[];
}

const TypingEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let i = 0;
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i));
        i++;
        if (i > text.length) {
          clearInterval(intervalId);
        }
      }, 20); // Adjust typing speed here
      return () => clearInterval(intervalId);
    }
  }, [text]);

  return <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{displayedText}<span className="inline-block w-2 h-4 bg-slate-700 dark:bg-slate-300 animate-pulse ml-1"></span></p>;
};


const AIAssistant: React.FC<AIAssistantProps> = ({ goals, habits }) => {
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'suggestion' | 'ideas'>('suggestion');

  const handleGetSuggestion = async () => {
    setIsLoading(true);
    setSuggestion('');
    setActiveTab('suggestion');
    const result = await getAISuggestion(goals, habits);
    setSuggestion(result);
    setIsLoading(false);
  };

  const handleGetIdeas = async () => {
    setIsLoading(true);
    setSuggestion('');
    setActiveTab('ideas');
    const result = await getAIGoalIdeas(goals, habits);
    setSuggestion(result);
    setIsLoading(false);
  };

  return (
    <section className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl border border-slate-300/30 dark:border-slate-700/50 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <WandIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Assistente IA</h2>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
        Receba sugestões, encorajamento e novas ideias com base em seus dados.
      </p>
      <div className="grid grid-cols-2 gap-2 mb-6">
        <button
          onClick={handleGetSuggestion}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
        >
          <SparklesIcon className="w-5 h-5" />
          <span>Obter Sugestão</span>
        </button>
        <button
          onClick={handleGetIdeas}
          disabled={isLoading}
          className="w-full flex items-center justify-center space-x-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LightBulbIcon className="w-5 h-5" />
          <span>Sugerir Metas</span>
        </button>
      </div>

      {isLoading && <div className="text-center text-sm text-slate-500 dark:text-slate-400">Gerando...</div>}
      
      {suggestion && !isLoading && (
        <div className="mt-4 p-4 bg-slate-100/70 dark:bg-slate-700/50 rounded-lg">
            <h3 className="font-bold text-sm mb-2 text-slate-800 dark:text-slate-200">
              {activeTab === 'suggestion' ? 'Sua sugestão personalizada:' : 'Ideias de novas metas:'}
            </h3>
            <TypingEffect text={suggestion} />
        </div>
      )}
    </section>
  );
};

export default AIAssistant;