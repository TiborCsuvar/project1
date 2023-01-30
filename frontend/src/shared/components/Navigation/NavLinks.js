import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContect } from '../../context/auth-contect';
import Button from '../FormElements/Button';

import './NavLinks.css';

export default function NavLinks() {
  const auth = useContext(AuthContect);
  return <ul className="nav-links">
    <li>
      <NavLink to="/" exact="true">All Users</NavLink>
    </li>

    {auth.isLoggedIn && (<li>
      <NavLink to="/1/places">My Places</NavLink>
    </li>)}

    {auth.isLoggedIn && (<li>
      <NavLink to="/places/new">Add Place</NavLink>
    </li>)}

    {!auth.isLoggedIn && (<li>
      <NavLink to="/auth">Authenticate</NavLink>
    </li>)}
    {auth.isLoggedIn && (
      <li>
        <Button onClick={auth.logout}>Logout</Button>
      </li>
    )}
  </ul>
}