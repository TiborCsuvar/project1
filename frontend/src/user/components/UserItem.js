import React from "react";
import { Link } from 'react-router-dom';

import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";

import './UserItem.css';

export default function UserItem(user) {
  return (
    <li className="user-item">
      <Card className="user-item-content">
        <Link to={`/${user.id}/places`}>
          <div className="user-item-image">
            <Avatar
              image={user.image}
              alt={user.alt}
            />
          </div>
          <div className="user-item-info">
            <h2>{user.name}</h2>
            <h3>{user.placeCount} {user.placeCount === 1 ? 'Place' : 'Places'}</h3>
          </div>
        </Link>
      </Card>
    </li>
  );
}