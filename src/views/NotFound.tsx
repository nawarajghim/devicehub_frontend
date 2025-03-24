import React from "react";
import "../style/data.css";

const NotFound: React.FC = () => {
  return (
    <div className="not-found-wrapper">
      <h2 className="h2-title">Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;
