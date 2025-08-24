import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import './DataDisplay.css';

const DataDisplay: React.FC = () => {
  const latestData = useSelector((state: RootState) => state.form.latestData);
  const [highlighted, setHighlighted] = useState(false);

  useEffect(() => {
    if (latestData) {
      setHighlighted(true);

      const timer = setTimeout(() => {
        setHighlighted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [latestData]);

  if (!latestData) {
    return (
      <div className="data-container">
        <h2>Submitted Form Data</h2>
        <p>No form data submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="data-container">
      <h2>Submitted Form Data</h2>

      <div className={`data-card ${highlighted ? 'highlight' : ''}`}>
        <h3>
          {latestData.formType === 'uncontrolled' ? 'Uncontrolled' : 'Hook'}{' '}
          Form Data
        </h3>
        <p>Name: {latestData.name}</p>
        <p>Age: {latestData.age}</p>
        <p>Email: {latestData.email}</p>
        <p>Gender: {latestData.gender}</p>
        <p>Country: {latestData.country}</p>
        {latestData.picture && (
          <div className="picture-preview">
            <img src={latestData.picture} alt="Profile" />
          </div>
        )}
        <p className="timestamp">
          Submitted: {new Date(latestData.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default DataDisplay;
