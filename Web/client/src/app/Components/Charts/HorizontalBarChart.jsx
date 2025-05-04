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


export const HorizontalBarChart = () => {
  return (
    <div style={{ width: 700, height: 300, backgroundColor: '#011f3d',borderRadius:"10px" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 80, left: -80, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#2c3e50" />
          <XAxis type="number" tick={{ fill: '#aaa' }} />
          <YAxis dataKey="name" type="category" tick={{ fill: '#fff' }} width={150} fontSize={8} />
          <Tooltip />
          <Bar dataKey="value" fill="#f59e0b" radius={[0, 10, 10, 0]}>
            <LabelList dataKey="value" position="right" fill="#fff" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
