import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import './SideDrawer.css';

export default function SideDrawer(props) {
  const nodeRef = React.useRef(null);
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      nodeRef={nodeRef}
      mountOnEnter
      unmountOnExit
    >
      <aside
        className="side-drawer" onClick={props.onClick}>{props.children}
      </aside>

    </CSSTransition>
  );
  return (
    ReactDOM.createPortal(content, document.getElementById('drawer-portal'))
  );
}