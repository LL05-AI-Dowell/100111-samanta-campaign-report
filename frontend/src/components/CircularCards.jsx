// import React from 'react';
// import { Grid, Paper, Typography } from '@mui/material';

// const CircularCards = ({ orgData }) => {
//   if (!orgData) return null;

//   const circularCardsData = [
//     { label: 'Total Campaigns', value: orgData.totalCampaigns },
//     { label: 'Total Audiences', value: orgData.totalAudiences },
//     { label: 'Total Leads Links', value: orgData.totalLeadsLinks },
//     { label: 'Active Campaigns', value: orgData.activeCampaigns },
//     { label: 'Inactive Campaigns', value: orgData.inactiveCampaigns }
//   ];

//   return (
//     <Grid container spacing={2}>
//       {circularCardsData.map((item, index) => (
//         <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
//           <Paper className="p-4">
//             <Typography variant="h6">{item.label}</Typography>
//             <Typography variant="subtitle1">{item.value}</Typography>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );
// };

// export default CircularCards;
import React from 'react';
import { Typography, Paper } from '@mui/material';

const CircularCard = ({ label, value }) => {
  return (
    <div className="p-4 flex flex-col items-center space-y-4">
      <Typography variant="subtitle1" className="text-xs">{label}</Typography>
      <div className="w-24 h-24 flex justify-center items-center rounded-full border-4 border-green-500">
        <div className="w-20 h-20 rounded-full flex justify-center items-center text-green text-base font-bold border-2 border-white">{value}</div>
      </div>
    </div>
  );
};

export default CircularCard;
