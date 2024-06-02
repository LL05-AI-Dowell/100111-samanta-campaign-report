import React from 'react';

const TimeIntervalSelector = ({ timeInterval, handleTimeIntervalChange, customDates, handleDateChange }) => {
  return (
    <div className="mb-4">
      <label className="mr-2" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'green', padding: '20px' , whiteSpace: 'nowrap'}}>Select Time Interval:</label>
      <select
        className="p-2 border rounded"
        value={timeInterval}
        onChange={(e) => handleTimeIntervalChange(e.target.value)}
      >
        <option value="ONE_DAY">One day</option>
        <option value="ONE_WEEK">One week</option>
        <option value="ONE_MONTH">One month</option>
        <option value="ONE_YEAR">One year</option>
        <option value="CUSTOM">Custom</option>
      </select>

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
    </div>
  );
};

export default TimeIntervalSelector;
