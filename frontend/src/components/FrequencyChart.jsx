import React from 'react';
import { Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const FrequencyCountChart = ({ data }) => {
  if (!data) return null;

  // Define colors for each section of the pie chart
  const COLORS = [ '#04b390','#0870cb',  '#f3db04', '#fe9b0a', '#d20338'];

  // Calculate total count to determine percentage
  const totalCount = Object.values(data).reduce((acc, curr) => acc + curr, 0);

  // Convert data object to an array of objects with name, value, and percentage properties
  const frequencyData = Object.entries(data).map(([key, value]) => ({
    name: key,
    value,
    percentage: (value / totalCount) * 100,
  }));

  return (
    <div style={{ width: '48%' }}>
<Typography variant="h6" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green', padding: '20px' , whiteSpace: 'nowrap'}}>Frequency Count</Typography>

      <PieChart width={400} height={300}>
        <Pie
          data={frequencyData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={40} // Adjust the inner radius for the donut chart
          fill="#8884d8"
          label={({ name, value, percentage }) => {
            // Show label only if value is non-zero
            return value !== 0 ? `${name} ${value}` : '';
          }}
                 >
          {frequencyData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
  payload={frequencyData.map((entry, index) => ({
    value: `${entry.name} ${entry.value}`,
    type: 'circle',
    color: COLORS[index],
  }))}
  
   // Set layout to vertical
  
/>

      </PieChart>
    </div>
  );
};

export default FrequencyCountChart;
