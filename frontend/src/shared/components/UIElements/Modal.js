import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import BackDrop from "./BackDrop";

import "./Modal.css";

function ModalOverlay(props) {
  const content = (
    <div className={`modal ${props.className}`}
      style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-portal"));
}

export default function Modal(props) {
  const nodeRef = React.useRef(null);

  return <React.Fragment>
    {props.show && <BackDrop onClick={props.OnCancel} />}
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="modal"
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
    >
      <ModalOverlay {...props} />
    </CSSTransition>
  </React.Fragment>
}