import React from "react";
import ReactDOM from "react-dom";

import './BackDrop.css';

export default function BackDrop({ onClick }) {
  const content = <div className="backdrop" onClick={onClick}></div>;
  return ReactDOM.createPortal(content, document.getElementById("backdrop-portal"));
}