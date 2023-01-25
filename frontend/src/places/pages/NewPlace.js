import React from "react";

import Input from "../../shared/components/FormElements/Input";

import "./NewPlace.css";

export default function NewPlace() {
  return (
    <form className="place-form">
      <label></label>
      <Input type="text" label="Title" element="input" />
    </form>
  );
}