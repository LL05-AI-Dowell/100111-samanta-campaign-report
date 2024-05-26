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

### `organization-report`

The `organization-report` event is used to transmit user data from the client to the server. The server accepts the following parameters:

- `timeInterval`: The interval between data updates. It only accepts the following values:
    - `ONE_DAY`: "ONE_DAY"
    - `ONE_WEEK`: "ONE_WEEK"
    - `ONE_MONTH`: "ONE_MONTH"
    - `ONE_YEAR`: "ONE_YEAR"
    - `CUSTOM`: "CUSTOM"
- `startDate`: The start date for data retrieval (send if the timeInterval is custom).
- `endDate`: The end date for data retrieval (send if the timeInterval is custom).
- `creatorId`: The ID of the workspace.
- `apiKey`: The apiKey of the user.
- `limit`: The maximum number of data to be returned
- `offset`: The offset you want to skip

#### Client-side Example:

```javascript
socket.emit('organization-report', {
  timeInterval: 'ONE_DAY',
  startDate: 'YYYY-MM-DD', // Send if timeInterval is 'CUSTOM'
  endDate: 'YYYY-MM-DD',   // Send if timeInterval is 'CUSTOM'
  creatorId: 'your_workspace_id',
  apiKey: 'your_user_id',
  limit: 'limit',
  offset: 'offset'
});
```

### `orgData`

The `orgData` event is emitted by the server every 10 seconds to update data. It provides information about the success or failure of data retrieval.

#### Client-side:

```javascript
socket.on('orgData', (data) => {
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
  "message": "Campaign list fetched successfully",
  "response": {
    // Your data object here
  },
  "lastUpdated": "YYYY-MM-DDTHH:MM:SSZ"
}
```

### `user-info`

The `user-info` event is used to retrieve user information data from the server. It requires the following parameters:

- `creatorId`: The ID of the user whose information is being requested.
- `apiKey`: The authentication key for accessing the user information.

#### Client-side Example:

```javascript
socket.emit('user-info', {
  creatorId: 'your_user_id',
  apiKey: 'your_api_key'
});
```

Upon receiving the `user-info` event, the server fetches the user information data and emits a response with the following payload:

```json
{
  "success": true,
  "message": "User information fetched successfully",
  "response": {
    // User information object here
  },
  "dateTime": "YYYY-MM-DDTHH:MM:SSZ"
}
```

If the operation fails, the server emits:

```json
{
  "success": false,
  "message": "Error fetching user information",
  "dateTime": "YYYY-MM-DDTHH:MM:SSZ"
}
```

#### Client-side Handling:

```javascript
socket.on('userinfo', (data) => {
  if (data.success) {
    // Handle successful user info retrieval
    console.log('User information:', data.response);
  } else {
    // Handle user info retrieval failure
    console.error('Error fetching user information:', data.message);
  }
});
```

The `user-info` event provides a way to fetch user information data from the server and handle the response accordingly on the client-side.

## Rest API

### Campaign List Endpoint

- **URL**: `api/v1/samanta-report/campaign_list`
- **Method**: `POST`
- **Bearer Token**: `"your_api_key"`
- **Payload**:
  ```json
  {
      "timeInterval": "ONE_WEEK",
      "creatorId": "your-workspace-id",
      "limit": 100,
      "offset": 0
  }
  ```

This API endpoint allows you to retrieve campaign reports. You need to provide a bearer token for authentication, and the payload should include the time interval, workspace ID (creatorId), limit (maximum number of data to be returned), and offset (skip offset).

### User Details Endpoint

- **URL**: `api/v1/samanta-report/user_details`
- **Method**: `GET`
- **Bearer Token**: `"your_api_key"`
- **Query Parameters**: `creator_id`

This endpoint allows you to retrieve user details. Provide the creator ID as a query parameter.

## Conclusion

This documentation provides an overview of the Samanta Campaign WebSocket functionality and its usage. For further details, refer to the code comments and documentation.