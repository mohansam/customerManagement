// src/components/SimpleModal.js

import React from "react";
import "./ErrorMessageModel.css"; // Import the CSS file

const ErrorMessageModel = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <p>{message}</p>
      <button className="modal-button" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ErrorMessageModel;
