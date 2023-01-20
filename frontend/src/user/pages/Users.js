import React from "react";

import UsersList from "../components/UsersList";

export default function Users() {

  const USERS = [
    {
      id: 1,
      name: 'Joe Kort',
      image: 'https://unsplash.com/photos/Xbf_4e7YDII',
      places: 4
    }
  ];

  return (
    <UsersList usersDummyArray={USERS} />
  );
}