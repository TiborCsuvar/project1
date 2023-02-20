import React, { useEffect, useState } from "react";

import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

export default function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLadedUsers] = useState();


  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3005/api/users")

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(response.message);
        }

        setLadedUsers(responseData);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false)

    };
    sendRequest();
  }, []);

  const errorHandler = () => {
    setError(null);
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading &&
        <div className="center">
          <LoadingSpinner />
        </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}