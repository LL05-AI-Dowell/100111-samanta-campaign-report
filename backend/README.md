
# Samanta Campaign Socket Documentation

This document provides documentation for the Samanta Campaign WebSocket functionality.

## Usage

Connect to the server using Socket.io:

```javascript
const socket = io.connect('http://localhost:5000');
```

## Events

### `connection`

The `connection` event is emitted when a client successfully connects to the server.

#### Server-side:

```javascript
socket.on("connection", () => {
    console.log("User connected", socket.id);
});
```

### `userData`

The `userData` event is used to transmit user data from the client to the server. The server accepts the following parameters:

- `timeInterval`: The interval between data updates. It only accepts the following values:
    - `ONE_DAY`: "ONE_DAY"
    - `ONE_WEEK`: "ONE_WEEK"
    - `ONE_MONTH`: "ONE_MONTH"
    - `ONE_YEAR`: "ONE_YEAR"
    - `CUSTOM`: "CUSTOM"
- `startDate`: The start date for data retrieval (send if the timeInterval is custom).
- `endDate`: The end date for data retrieval (send if the timeInterval is custom).
- `workspaceId`: The ID of the workspace.
- `userId`: The ID of the user.

#### Client-side Example:

```javascript
socket.emit('userData', {
  timeInterval: 'ONE_DAY',
  startDate: 'YYYY-MM-DD', // Send if timeInterval is 'CUSTOM'
  endDate: 'YYYY-MM-DD',   // Send if timeInterval is 'CUSTOM'
  workspaceId: 'your_workspace_id',
  userId: 'your_user_id'
});
```

### `dataUpdate`

The `dataUpdate` event is emitted by the server every 30 seconds to update data. It provides information about the success or failure of data retrieval.

#### Client-side:

```javascript
socket.on('dataUpdate', (data) => {
  if (data.success) {
    // Handle successful data update
    console.log('Data updated:', data.data);
  } else {
    // Handle data retrieval failure
    console.error('Data update failed:', data.message);
  }
});
```

If data retrieval fails, the server emits:

```json
{
  "success": false,
  "message": "Invalid payload",
  "lastUpdated": "YYYY-MM-DDTHH:MM:SSZ"
}
```

If data retrieval is successful, the server emits:

```json
{
  "success": true,
  "data": {
    // Your data object here
  },
  "lastUpdated": "YYYY-MM-DDTHH:MM:SSZ"
}
```

## Conclusion

This documentation provides an overview of the Samanta Campaign WebSocket functionality and its usage. For further details, refer to the code comments and documentation.
