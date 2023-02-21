import React, { useContext } from "react";
import { useNavigate } from 'react-router-dom';

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import "./PlaceForm.css";

export default function NewPlace() {
  const auth = useContext(AuthContext);
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

  const navigate = useNavigate();

  const placeSubmitHandler = async event => {
    event.preventDefault();

    try {
      await sendRequest("http://localhost:3005/api/places",
        "POST",
        {
          "Content-Type": "application/json"
        },
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: auth.userId
        })
      );
      navigate("/");
    } catch (err) { }
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
      />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </React.Fragment>
  );
}