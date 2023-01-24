import React from "react";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [{
  id: '1',
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
  id: '2',
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
  return <PlaceList items={DUMMY_PLACES} />;
}