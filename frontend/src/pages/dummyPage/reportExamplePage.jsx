import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, CircularProgress, Grid, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const socket = io.connect('http://localhost:5000');

const ReportExamplePage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [timeInterval, setTimeInterval] = useState('ONE_WEEK');
  const [anchorEl, setAnchorEl] = useState(null);
  const [customDates, setCustomDates] = useState({ startDate: '', endDate: '' });
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingOrgData, setLoadingOrgData] = useState(true);

  const memoizedSocket = useMemo(() => socket, []);

  useEffect(() => {
    setLoadingUserInfo(true);
    memoizedSocket.emit('user-info', {
      creatorId: '64f03084a7058c23ee36cfc9',
      apiKey: '1b834e07-c68b-4bf6-96dd-ab7cdc62f07f'
    });

    memoizedSocket.on('userinfo', (data) => {
      setLoadingUserInfo(false);
      if (data.success) {
        setUserInfo(data.response[0]);
      } else {
        console.error('Error fetching user information:', data.message);
      }
    });

    return () => {
      memoizedSocket.off('userinfo');
    };
  }, [memoizedSocket]);

  useEffect(() => {
    setLoadingOrgData(true);
    const reportPayload = {
      creatorId: '64f03084a7058c23ee36cfc9',
      apiKey: '1b834e07-c68b-4bf6-96dd-ab7cdc62f07f',
      limit: 100,
      offset: 0,
      timeInterval,
      startDate: timeInterval === 'CUSTOM' ? customDates.startDate : undefined,
      endDate: timeInterval === 'CUSTOM' ? customDates.endDate : undefined,
    };

    memoizedSocket.emit('organization-report', reportPayload);

    memoizedSocket.on('orgData', (data) => {
      setLoadingOrgData(false);
      if (data.success) {
        setOrgData(data.response);
      } else {
        console.error('Data update failed:', data.message);
      }
    });

    return () => {
      memoizedSocket.off('orgData');
    };
  }, [memoizedSocket, timeInterval, customDates]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleTimeIntervalChange = (interval) => {
    setTimeInterval(interval);
    setAnchorEl(null);
  };

  const handleDateChange = (e) => {
    setCustomDates({ ...customDates, [e.target.name]: e.target.value });
  };

  const renderBarChart = () => {
    if (!orgData) return null;
    return (
      <div>
        <Typography variant="h6">Broadcast Type Count</Typography>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ width: '48%' }}>
            <BarChart
              width={500}
              height={300}
              data={[orgData.broadcastTypeCount]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="EMAIL" fill="#8884d8" />
            </BarChart>
          </div>
          <div style={{ width: '48%' }}>
            <BarChart
              width={500}
              height={300}
              data={[orgData.frequencyCount]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="DAILY" fill="#8884d8" />
              <Bar dataKey="WEEKLY" fill="#82ca9d" />
              <Bar dataKey="FORTNIGHTLY" fill="#ffc658" />
              <Bar dataKey="MONTHLY" fill="#0088aa" />
              <Bar dataKey="QUARTERLY" fill="#00aa88" />
            </BarChart>
          </div>
        </div>
      </div>
    );
  };

  const renderCircularCards = () => {
    if (!orgData) return null;
    const circularCardsData = [
      { label: 'Total Campaigns', value: orgData.totalCampaigns },
      { label: 'Total Audiences', value: orgData.totalAudiences },
      { label: 'Total Leads Links', value: orgData.totalLeadsLinks },
      { label: 'Active Campaigns', value: orgData.activeCampaigns },
      { label: 'Inactive Campaigns', value: orgData.inactiveCampaigns }
    ];
    return (
      <Grid container spacing={2}>
        {circularCardsData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Paper className="p-4">
              <Typography variant="h6">{item.label}</Typography>
              <Typography variant="subtitle1">{item.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    );
  };
  const renderCampaignDetailsTable = () => {
    if (!orgData || !orgData.campaignDetails) return null;
    return (
      <div>
        <Typography variant="h6">Campaign Details</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Email Count</TableCell>
              <TableCell>Link Count</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orgData.campaignDetails.map((campaign, index) => (
              <TableRow key={index}>
                <TableCell>{campaign.id}</TableCell>
                <TableCell>{campaign.title}</TableCell>
                <TableCell>{campaign.emailCount}</TableCell>
                <TableCell>{campaign.linkCount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar className="flex justify-between">
          <Typography variant="h6" className="text-white">Samanta Report</Typography>
          {userInfo && (
            <div>
              <Avatar className="cursor-pointer" src={userInfo.image_url} alt={userInfo.username} onClick={handleMenuOpen} />
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleMenuClose}>{userInfo.username}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{userInfo.email}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{userInfo.workspace_id}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{userInfo.credits}</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>

      <div className="p-4">
        <div className="mb-4">
          <label className="mr-2">Time Interval:</label>
          <select
            className="p-2 border rounded"
            value={timeInterval}
            onChange={(e) => handleTimeIntervalChange(e.target.value)}
          >
            <option value="ONE_DAY">ONE_DAY</option>
            <option value="ONE_WEEK">ONE_WEEK</option>
            <option value="ONE_MONTH">ONE_MONTH</option>
            <option value="ONE_YEAR">ONE_YEAR</option>
            <option value="CUSTOM">CUSTOM</option>
          </select>
        </div>

        {timeInterval === 'CUSTOM' && (
          <div className="mb-4">
            <label className="mr-2">Start Date:</label>
            <input
              type="date"
              name="startDate"
              className="p-2 border rounded"
              value={customDates.startDate}
              onChange={handleDateChange}
            />
            <label className="mr-2 ml-4">End Date:</label>
            <input
              type="date"
              name="endDate"
              className="p-2 border rounded"
              value={customDates.endDate}
              onChange={handleDateChange}
            />
          </div>
        )}

        {loadingOrgData ? (
          <div className="flex justify-center items-center h-64">
            <CircularProgress />
          </div>
        ) : (
          <>
            {renderCircularCards()}
            {renderBarChart()}
            {renderCampaignDetailsTable()}
          </>
        )}
      </div>
    </div>
  );
};

export default ReportExamplePage;
