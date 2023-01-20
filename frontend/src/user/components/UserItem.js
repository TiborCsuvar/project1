import React from "react";

import './UserItem.css';

export default function UserItem(user) {
  return (
    <li className="user-item">
      <div className="user-item-content">
        <div>
          <img src={user.image} alt={user.name} />
        </div>
        <div className="user-item-info">
          <h2>{user.name}</h2>
          <h3>{user.placeCount}</h3>
        </div>
      </div>
    </li>
  );
}