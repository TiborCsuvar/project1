import React from "react";

import Input from "../../shared/components/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../shared/util/validator";

import "./NewPlace.css";

export default function NewPlace() {
  return (
    <form className="place-form">
      <Input
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title" />
    </form>
  );
}