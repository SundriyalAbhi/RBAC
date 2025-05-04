import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'elf', size: 1 },
  { name: 'mozi', size: 1 },
  { name: '32-bit', size: 1 },
  { name: 'mips', size: 1 },
  { name: 'mirai', size: 1 },
  { name: 'geofenced', size: 1 },
  { name: 'qakbot', size: 1 },
  { name: 'usa', size: 1 },
  { name: 'quakbot', size: 1 },
];

const colors = [
  '#556B2F', '#1E2A38', '#3C5A92', '#8B0000',
  '#A52A2A', '#B22222', '#2E8B57', '#228B22', '#4B0082'
];

const formatSize = (value) => (value * 100).toFixed(2) + 'K';

const CustomizedContent = (props) => {
  const { x, y, width, height, index, name, size } = props;
  const fill = colors[index % colors.length];

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} style={{ fill, stroke: '#111' }} />
      <text
        x={x + width / 2}
        y={y + height / 2 - 5}
        textAnchor="middle"
        fill="#fff"
        fontSize={16}
        fontWeight="bold"
      >
        {formatSize(size)}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 15}
        textAnchor="middle"
        fill="#ccc"
        fontSize={13}
      >
        {name}
      </text>
    </g>
  );
};

export const TreeChart = () => {
  return (
    <div style={{ width: 400, height: 300, padding: 16 }}>
      <ResponsiveContainer>
        <Treemap
          width={600}
          height={600}
          data={data}
          dataKey="size"
          type="flat"
          stroke="#333"
          content={<CustomizedContent />}
        />
      </ResponsiveContainer>
    </div>
  );
};
