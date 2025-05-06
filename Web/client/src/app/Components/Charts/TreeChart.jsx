import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'elf', size: 50.92 },
  { name: 'mozi', size: 50.98 },
  { name: '32-bit', size: 50.43 },
  { name: 'mips', size: 51.03 },
  { name: 'mirai', size: 50.07 },
  { name: 'geofenced', size: 50.89 },
  { name: 'qakbot', size: 50.26 },
  { name: 'usa', size: 50.4 },
  { name: 'quakbot', size: 50.32 },
];

const colors = [
  '#303e2a', '#182739', '#304a6d', '#302039',
  '#4d3839', '#45202b', '#45202b', '#2a4746', '#382469'
];

const formatSize = (value) => (value * 10).toFixed(2) + 'K';

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
        fontSize={14}
        fontWeight="bold"
        pointerEvents="none"
      >
        {formatSize(size)}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 12}
        textAnchor="middle"
        fill="#ccc"
        fontSize={12}
        pointerEvents="none"
      >
        {name}
      </text>
    </g>
  );
};

export const TreeChart = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '250px',
        background: 'linear-gradient(145deg, #0b1f33, #081a2a)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
        borderRadius: '16px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="size"
          type="flat"
          stroke=""
          content={<CustomizedContent />}
        />
      </ResponsiveContainer>
    </div>
  );
};
