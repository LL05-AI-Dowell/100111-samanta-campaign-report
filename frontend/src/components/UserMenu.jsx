
// import React from 'react';
// import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem } from '@mui/material';

// const UserMenu = ({ userInfo, anchorEl, handleMenuOpen, handleMenuClose }) => {
//   return (
//     <AppBar position="static">
//       <Toolbar className="flex justify-between">
//         <Typography variant="h6" className="text-white">Samanta Report</Typography>
//         {userInfo && (
//           <div>
//              <Avatar
//                sx={{ width: 60, height: 60, borderRadius: '50%' }}
//                   src={userInfo.image_url}
//                   alt={userInfo.username}
//                   onClick={handleMenuOpen}
//                 />
//                 <Menu
//                   anchorEl={anchorEl}
//                   open={Boolean(anchorEl)}
//                   onClose={handleMenuClose}
//                   PaperProps={{
//                     sx: {
//                       border: '2px solid lightgreen', 
//                       borderRadius: '20px', 
//                     },
//                   }}
//                 >
//                   <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Username:</span> {userInfo.username}</MenuItem>
//                   <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Email:</span> {userInfo.email}</MenuItem>
//                   <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Workspace Id:</span> {userInfo.workspace_id}</MenuItem>
//                   <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Credits:</span> {userInfo.credits}</MenuItem>
//                   <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Api Key:</span> {userInfo.api_key}</MenuItem>
//                   <MenuItem onClick={handleMenuClose}>
//                   <span className="font-semibold text-green-500">Payment status:</span> {userInfo.has_paid_account ? 'Yes' : 'No'}
//           </MenuItem>
//           <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Active status:</span> {userInfo.active_status? 'True' : 'False'}</MenuItem>
          
//                 </Menu>
//               </div>
//         )}
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default UserMenu;
import React from 'react';
import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem } from '@mui/material';

const UserMenu = ({ userInfo, anchorEl, handleMenuOpen, handleMenuClose }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'green' }}>
      <Toolbar className="flex justify-between">
        <Typography variant="h6" className="text-white">Samanta Campaign Report</Typography>
        {userInfo && (
          <div>
             <Avatar
               sx={{ width: 60, height: 60, borderRadius: '50%' }}
                  src={userInfo.image_url}
                  alt={userInfo.username}
                  onClick={handleMenuOpen}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                  PaperProps={{
                    sx: {
                      border: '2px solid lightgreen', 
                      borderRadius: '20px', 
                    },
                  }}
                >
                  <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Username:</span> {userInfo.username}</MenuItem>
                  <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Email:</span> {userInfo.email}</MenuItem>
                  <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Workspace Id:</span> {userInfo.workspace_id}</MenuItem>
                  <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Credits:</span> {userInfo.credits}</MenuItem>
                  <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Api Key:</span> {userInfo.api_key}</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                  <span className="font-semibold text-green-500">Payment status:</span> {userInfo.has_paid_account ? 'Yes' : 'No'}
          </MenuItem>
          <MenuItem onClick={handleMenuClose}><span className="font-semibold text-green-500">Active status:</span> {userInfo.active_status? 'True' : 'False'}</MenuItem>
          
                </Menu>
              </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default UserMenu;
