import React from "react";

import Card from "../../shared/components/UIElements/Card";
import UserItem from "./UserItem";

import './UsersList.css';

export default function UsersList({ usersDummyArray }) {
  if (usersDummyArray.length === 0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
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
          placeCount={user.places.length}
        />;
      })}
    </ul>
  );
}