import "./Skeleton.css";

import React from "react";

const Skeleton = () => {
  return (
    <div className="skeleton-div">
      <div className="skeleton-item">
        <div>
          <div className="skeleton-img" />
        </div>
        <div className="skeleton-info">
          <p className="skeleton-name" />
          <p className="skeleton-email" />
          <div style={{ display: "flex" }}>
            <p className="skeleton-like" />
            <p className="skeleton-like" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
