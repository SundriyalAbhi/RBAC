import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts';

const data = [
  { name: 'Redline', value: 80000 },
  { name: 'Mozi', value: 72000 },
  { name: 'Amadey', value: 60000 },
  { name: 'Mirai', value: 32000 },
  { name: 'evilginx2', value: 30000 },
  { name: 'Cobalt Strike', value: 20000 },
  { name: 'Bashlite', value: 18000 },
  { name: 'Gamaredon Group', value: 15000 },
  { name: 'Mirai', value: 12000 },
  { name: 'TR', value: 10000 },
];

const COLORS = ['#f59e0b', '#ef4444', '#10b981']; // Yellow, Red, Green

export const HorizontalBarChart = () => {
  return (
    <div style={{ width: 800, height: 300, backgroundColor: '#0e1a25'}}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 40, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
          <XAxis type="number" tick={{ fill: '#aaa' }} />
          <YAxis dataKey="name" type="category" tick={{ fill: '#fff' }} width={150} />
          <Tooltip />
          <Bar dataKey="value" fill="#f59e0b">
            <LabelList dataKey="value" position="right" fill="#fff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
