import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";


export default function UserPlaces() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedPlaces, setLoadedPlaces] = useState();

  const userId = useParams().userId;

  useEffect(() => {

    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:3005/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (err) { }

    }
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = deletedPlaceId => {
    setLoadedPlaces(prevPlaces =>
      prevPlaces.filter(place => place.id !== deletedPlaceId));
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <div className="center">
        <LoadingSpinner on />
      </div>}
      {!isLoading && loadedPlaces &&
        <PlaceList
          items={loadedPlaces}
          onDeletePlace={placeDeletedHandler}
        />}
    </React.Fragment>
  );
}