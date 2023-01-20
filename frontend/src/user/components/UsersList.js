import React from "react";

import './UsersList.css';
import UserItem from "./UserItem";

export default function UsersList({ usersDummyArray }) {
  if (!usersDummyArray) {
    return (
      <div className="center">
        <h2>No users found.</h2>
      </div>
    );
  }
  return (
    <ul className="users-list">
      {usersDummyArray.map(user => {
        return <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />;
      })}
    </ul>
  );
}