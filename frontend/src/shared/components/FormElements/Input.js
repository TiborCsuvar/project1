import React from "react";

import "./Input.css";

export default function Input(props) {
  const element = props.element === "input" ? (
    <input id={props.id} type={props.type} placeholder={props.placeholder} />
  ) : (
    <textarea id={props.id} rows={props.rows || 2} />
  );

  return <div className={`form-control`}>
    <label htmlFor={props.div}>
      {props.label}
    </label>
    {element}
  </div>
}