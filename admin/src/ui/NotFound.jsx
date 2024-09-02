import React from 'react';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Page Not Found</p>
      <a href="/" className="not-found-link">Go Home</a>
    </div>
  );
};

export default NotFound;
