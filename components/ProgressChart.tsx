import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Goal } from '../types';
import { ChartBarIcon } from './icons/Icons';

interface ProgressChartProps {
  goals: Goal[];
}

const COLORS = ['#34D399', '#60A5FA', '#FBBF24', '#A78BFA', '#F87171'];

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-100/80 dark:bg-slate-700/80 backdrop-blur-sm p-2 border border-slate-300 dark:border-slate-600 rounded-md shadow-lg">
        <p className="font-bold text-slate-800 dark:text-slate-100">{`${label}`}</p>
        <p className="text-teal-500 dark:text-teal-300">{`Progresso: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};


const ProgressChart: React.FC<ProgressChartProps> = ({ goals }) => {
  const chartData = goals.map(goal => ({
    name: goal.title,
    progress: goal.progress,
  }));

  const isDarkMode = document.documentElement.classList.contains('dark');
  const tickColor = isDarkMode ? '#94a3b8' : '#64748b';
  const axisLineColor = isDarkMode ? '#475569' : '#e2e8f0';


  return (
    <section className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg p-6 rounded-2xl border border-slate-300/30 dark:border-slate-700/50 shadow-sm">
      <div className="flex items-center space-x-3 mb-4">
        <ChartBarIcon className="w-6 h-6 text-slate-500 dark:text-slate-400" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200">Visualização de Progresso</h2>
      </div>
      <div style={{ width: '100%', height: 250 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <XAxis dataKey="name" tick={{ fill: tickColor, fontSize: 12 }} tickLine={false} axisLine={{ stroke: axisLineColor }} />
            <YAxis tick={{ fill: tickColor, fontSize: 12 }} tickFormatter={(value) => `${value}%`} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(100, 116, 139, 0.1)' }} />
            <Bar dataKey="progress" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ProgressChart;