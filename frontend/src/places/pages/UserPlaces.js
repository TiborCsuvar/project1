import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [{
  id: 'p1',
  title: 'Halászbástya',
  description: 'A fortress from the XIX. century.',
  imageUrl: '/halaszbastya.jfif',
  address: 'Budapest, Szentháromság tér, 1014',
  creator: '1',
  location: {
    lat: 47.5021827,
    lng: 19.0325925
  }
},
{
  id: 'p2',
  title: 'Halászbástya',
  description: 'A fortress from the XIX. century.',
  imageUrl: '/halaszbastya.jfif',
  address: 'Budapest, Szentháromság tér, 1014',
  creator: '2',
  location: {
    lat: 47.5021827,
    lng: 19.0325925
  }
}];

export default function UserPlaces() {
  const userId = useParams().userId;
  const userPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={userPlaces} />;
}