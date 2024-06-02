// import React, { useState, useEffect, useMemo } from 'react';
// import io from 'socket.io-client';
// import TimeIntervalSelector from '../../components/TimeIntervalSelector';
// import CircularCards from '../../components/CircularCards';
// import CampaignDetailsTable from '../../components/CampaignDetailsTable';
// import { CircularProgress, Typography } from '@mui/material';
// import UserMenu from '../../components/UserMenu';
// import BroadcastTypeChart from '../../components/BroadcastTypeChart';
// import FrequencyChart from '../../components/FrequencyChart';

// const socket = io.connect('http://localhost:5000');

// const ReportPage = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [orgData, setOrgData] = useState(null);
//   const [timeInterval, setTimeInterval] = useState('ONE_WEEK');
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [customDates, setCustomDates] = useState({ startDate: '', endDate: '' });
//   const [loadingUserInfo, setLoadingUserInfo] = useState(true);
//   const [loadingOrgData, setLoadingOrgData] = useState(true);
//   const [lastUpdated, setLastUpdated] = useState('');

//   const memoizedSocket = useMemo(() => socket, []);

//   useEffect(() => {
//     setLoadingUserInfo(true);
//     memoizedSocket.emit('user-info', {
//       creatorId: '645e311f1ce598e073724fef',
//       apiKey: '921bc7da-eba4-4ef2-acaf-e6373a07229c'
//     });

//     memoizedSocket.on('userinfo', (data) => {
//       setLoadingUserInfo(false);
//       if (data.success) {
//         setUserInfo(data.response[0]);
//       } else {
//         console.error('Error fetching user information:', data.message);
//       }
//     });

//     return () => {
//       memoizedSocket.off('userinfo');
//     };
//   }, [memoizedSocket]);

//   useEffect(() => {
//     setLoadingOrgData(true);
//     const reportPayload = {
//       creatorId: '645e311f1ce598e073724fef',
//       apiKey: '921bc7da-eba4-4ef2-acaf-e6373a07229c',
//       limit: 100,
//       offset: 0,
//       timeInterval,
//       startDate: timeInterval === 'CUSTOM' ? customDates.startDate : undefined,
//       endDate: timeInterval === 'CUSTOM' ? customDates.endDate : undefined,
//     };

//     memoizedSocket.emit('organization-report', reportPayload);

//     memoizedSocket.on('orgData', (data) => {
//       setLoadingOrgData(false);
//       if (data.success) {
//         setOrgData(data.response);
//         setLastUpdated(data.dateTime); 
//       } else {
//         console.error('Data update failed:', data.message);
//       }
//     });

//     return () => {
//       memoizedSocket.off('orgData');
//     };
//   }, [memoizedSocket, timeInterval, customDates]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleTimeIntervalChange = (interval) => {
//     setTimeInterval(interval);
//     setAnchorEl(null);
//   };

//   const handleDateChange = (e) => {
//     setCustomDates({ ...customDates, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="App">
//       <UserMenu
//         userInfo={userInfo}
//         anchorEl={anchorEl}
//         handleMenuOpen={handleMenuOpen}
//         handleMenuClose={handleMenuClose}
//       />

// <div className="m-4 border border-red-500 rounded-lg">
//   <p className="text-center text-red-500 font-medium p-4">
//     Every 10 seconds your report will be updated if there is new data
//   </p>
// </div>

//              <div className="flex justify-between items-center p-4">

//              <Typography variant="body1" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'green', padding: '20px' , whiteSpace: 'nowrap'}}>
//         {lastUpdated && `Last Updated: ${lastUpdated}`}
//       </Typography>
//          <div>
//            <TimeIntervalSelector
//              timeInterval={timeInterval}
//              handleTimeIntervalChange={handleTimeIntervalChange}
//              customDates={customDates}
//              handleDateChange={handleDateChange}
//        />
//         </div>
//       </div>


//         {loadingOrgData ? (
//           <div className="flex justify-center items-center h-64">
//             <CircularProgress />
//           </div>
//         ) : (
//           <>
//             <div className="grid grid-cols-5 gap-4">
//               <CircularCards label="Total Campaigns" value={orgData.totalCampaigns} />
//               <CircularCards label="Total Emails Collected" value={orgData.totalAudiences} />
//               <CircularCards label="Total Links Crawled" value={orgData.totalLeadsLinks} />
//               <CircularCards label="Total Inactive Campaigns" value={orgData.inactiveCampaigns} />
//               <CircularCards label="Total Active Campaigns" value={orgData.activeCampaigns} />
//             </div>

//             <div className="flex flex-row item-center justify-center gap-32">
//               <div className="whitespace-nowrap">
//                 <BroadcastTypeChart data={orgData?.broadcastTypeCount} />
//               </div>
              
//               <div className="">
//                 <FrequencyChart data={orgData.frequencyCount} />
//               </div>
//             </div>

//             <CampaignDetailsTable orgData={orgData} />
//           </>
//         )}
//       </div>
   
//   );
// };

// export default ReportPage;
import React, { useState, useEffect, useMemo } from 'react';
import io from 'socket.io-client';
import TimeIntervalSelector from '../../components/TimeIntervalSelector';
import CircularCards from '../../components/CircularCards';
import CampaignDetailsTable from '../../components/CampaignDetailsTable';
import { CircularProgress, Typography, Paper } from '@mui/material';
import UserMenu from '../../components/UserMenu';
import BroadcastTypeChart from '../../components/BroadcastTypeChart';
import FrequencyChart from '../../components/FrequencyChart';
import formatDateString from '../../services/helper'

const socket = io.connect('http://localhost:5000');

const ReportPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [orgData, setOrgData] = useState(null);
  const [timeInterval, setTimeInterval] = useState('ONE_WEEK');
  const [anchorEl, setAnchorEl] = useState(null);
  const [customDates, setCustomDates] = useState({ startDate: '', endDate: '' });
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);
  const [loadingOrgData, setLoadingOrgData] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');

  const memoizedSocket = useMemo(() => socket, []);

  useEffect(() => {
    setLoadingUserInfo(true);
    memoizedSocket.emit('user-info', {
      creatorId: '645e311f1ce598e073724fef',
      apiKey: '921bc7da-eba4-4ef2-acaf-e6373a07229c'
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
      creatorId: '645e311f1ce598e073724fef',
      apiKey: '921bc7da-eba4-4ef2-acaf-e6373a07229c',
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
        
        setLastUpdated(formatDateString(data.dateTime)); 
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

  return (
    <div className="App">
      <UserMenu
        userInfo={userInfo}
        anchorEl={anchorEl}
        handleMenuOpen={handleMenuOpen}
        handleMenuClose={handleMenuClose}
      />

      <Paper elevation={3} className="m-4 p-4">
        <Typography variant="body1" className="mb-4">
          Every 10 seconds your report will be updated if there is new data
        </Typography>
      </Paper>

      <div className="p-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <Typography variant="body1" className="mb-4 sm:mb-0">
          {lastUpdated && `Last Updated: ${lastUpdated}`}
        </Typography>
        <div className="sm:ml-4">
          <TimeIntervalSelector
            timeInterval={timeInterval}
            handleTimeIntervalChange={handleTimeIntervalChange}
            customDates={customDates}
            handleDateChange={handleDateChange}
          />
        </div>
      </div>

      {loadingOrgData ? (
        <div className="flex justify-center items-center h-64">
          <CircularProgress />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <CircularCards label="Total Campaigns" value={orgData.totalCampaigns} />
            <CircularCards label="Total Emails Collected" value={orgData.totalAudiences} />
            <CircularCards label="Total Links Crawled" value={orgData.totalLeadsLinks} />
            <CircularCards label="Total Inactive Campaigns" value={orgData.inactiveCampaigns} />
            <CircularCards label="Total Active Campaigns" value={orgData.activeCampaigns} />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
            <div className="w-full sm:w-auto">
              <BroadcastTypeChart data={orgData?.broadcastTypeCount} />
            </div>
            <div className="w-full sm:w-auto">
              <FrequencyChart data={orgData.frequencyCount} />
            </div>
          </div>

          <CampaignDetailsTable orgData={orgData} />
        </>
      )}
    </div>
  );
};

export default ReportPage;
