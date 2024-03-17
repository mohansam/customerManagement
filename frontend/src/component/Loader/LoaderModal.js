// LoaderModal.js
import React from "react";
import "./LoaderModal.css"; // Assuming you will create a CSS file for this component

const LoaderModal = () => {
  return (
    <div className="loader-modal">
      <div className="loader">Loading...</div>{" "}
      {/* You can replace this with any loader animation */}
    </div>
  );
};

export default LoaderModal;
