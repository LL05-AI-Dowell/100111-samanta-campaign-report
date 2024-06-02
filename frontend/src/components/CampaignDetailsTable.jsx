
import React from 'react';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';

const CampaignDetailsTable = ({ orgData }) => {
  if (!orgData || !orgData.campaignDetails) return null;

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'green', marginBottom: '20px' }}>Campaigns Details</Typography>

      <Table style={{ border: '2px solid green'}}> 
        <TableHead>
          <TableRow style={{ borderBottom: '1.5px solid green' }}>
            <TableCell style={{ borderRight: '1.5px solid green' }}><b style={{ fontSize: '1.1rem' }}>Campaign ID</b></TableCell>
            <TableCell style={{ borderRight: '1.5px solid green' }}><b style={{ fontSize: '1.1rem' }}>Campaign Title</b></TableCell>
            <TableCell style={{ borderRight: '1.5px solid green' }}><b style={{ fontSize: '1.1rem' }}>Email/ Phone Number Count</b></TableCell>
            <TableCell style={{ borderRight: '1.5px solid green' }}><b style={{ fontSize: '1.1rem' }}>Campaign Link Count</b></TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {orgData.campaignDetails.map((campaign, index) => (
            <TableRow key={index}>
              <TableCell style={{ borderRight: '1.5px solid green' }}>{campaign.id}</TableCell>
              <TableCell style={{ borderRight: '1.5px solid green' }}>{campaign.title}</TableCell>
              <TableCell style={{ borderRight: '1.5px solid green' }}>{campaign.emailCount}</TableCell>
              <TableCell>{campaign.linkCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignDetailsTable;
