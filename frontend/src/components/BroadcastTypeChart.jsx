import React from 'react';
import { Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const BroadcastTypeChart = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{ width: '45%' }}>
      <Typography variant="h6" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green', padding: '20px' }}>Broadcast Type Count</Typography>

      <BarChart
        width={250}
        height={300}
        data={[data]}
        margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
        barCategoryGap={300} // Adjust the gap size as needed
        barGap={50} // Adjust the gap between groups of bars as needed
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> Remove CartesianGrid */}
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="EMAIL" fill="#F07167" barSize={25} />
        <Bar dataKey="SMS" fill="#4D869C" barSize={25} />
      </BarChart>
    </div>
  );
};

export default BroadcastTypeChart;
