import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

interface TaskChartProps {
  data: Array<{ name: string; value: number }>;
  chartType: 'bar' | 'pie';
  viewMode: 'count' | 'percentage';
  colors: string[];
  colorScheme?: string;
}

/**
 * Chart component for task statistics visualization
 */
const TaskChart: React.FC<TaskChartProps> = ({
  data,
  chartType,
  viewMode,
  colors,
  colorScheme = 'blue'
}) => {
  // Get gradient for chart
  const getGradient = () => {
    switch (colorScheme) {
      case 'amber': return { from: '#f59e0b', to: '#d97706' };
      case 'emerald': return { from: '#10b981', to: '#059669' };
      case 'rose': return { from: '#f43f5e', to: '#e11d48' };
      case 'bw': return { from: '#1f2937', to: '#374151' };
      default: return { from: '#3b82f6', to: '#2563eb' };
    }
  };

  // Get color for text based on color scheme
  const getTextColor = () => {
    switch (colorScheme) {
      case 'amber': return 'text-amber-600';
      case 'emerald': return 'text-emerald-600';
      case 'rose': return 'text-rose-600';
      case 'bw': return 'text-gray-800';
      default: return 'text-blue-600';
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className={`${getTextColor()} font-semibold`}>
            {viewMode === 'count' 
              ? `${payload[0].value} klikov` 
              : `${payload[0].value}%`
            }
          </p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="h-80">
      {chartType === 'bar' ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60}
              tick={{ fontSize: 12 }}
            />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={getGradient().from} stopOpacity={0.8} />
                <stop offset="100%" stopColor={getGradient().to} stopOpacity={0.6} />
              </linearGradient>
            </defs>
            <Bar 
              dataKey="value" 
              fill="url(#barGradient)" 
              radius={[4, 4, 0, 0]}
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={colors[index % colors.length]} 
                />
              ))}
            </Pie>
            <Tooltip formatter={(value) => viewMode === 'count' ? `${value} clicks` : `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default TaskChart;