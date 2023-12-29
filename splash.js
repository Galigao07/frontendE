// JavaScript file to create the circular progress bar using Material-UI
import React from 'react';
import ReactDOM from 'react-dom';
import CircularProgress from '@mui/material/CircularProgress';

ReactDOM.render(
  <CircularProgress color="primary" size={60} />, // Adjust size and color as needed
  document.getElementById('circular-progress')
);
