import React from 'react';
import './app.scss';

const Shimmer = () => {
  return (
    <div className="shimmer-card">
    <div className="shimmer-thumbnail"></div>
    <div className="shimmer-line shimmer-title"></div>
    <div className="shimmer-line shimmer-category"></div>
  </div>
  );
};

export default Shimmer;
