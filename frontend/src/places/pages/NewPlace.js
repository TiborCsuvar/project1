import React from "react";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";

import "./PlaceForm.css";

export default function NewPlace() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false
      },
      description: {
        value: "",
        isValid: false
      },
      address: {
        value: "",
        isValid: false
      }
    },
    false
  );


  const placeSubmitHandler = event => {
    event.preventDefault();

    sendRequest("http://localhost:3005/api/places",
      "POST",
      {
        "Content-Type": "application/json"
      },
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,

      })
    );
  };

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title"
        onInput={inputHandler} />

      <Input
        id="description"
        label="Description"
        element="teaxtarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler} />

      <Input
        id="address"
        label="Address"
        element="input"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please enter a valid address."
        onInput={inputHandler} />
      <Button
        type="submit"
        disabled={!formState.isValid}
      >Add place</Button>
    </form>
  );
}