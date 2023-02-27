import React, { useRef } from "react";

import Button from "./Button";

import "./ImageUpload.css";

export default function ImageUpload(props) {
  const filePicker = useRef();

  const selectImageHandler = () => {
    filePicker.current.click();
  };

  const pickedHandler = event => {
    console.log(event.target);
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePicker}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={selectImageHandler}>Select an image</Button>
      </div>
    </div>
  );
};