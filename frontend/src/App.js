import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import MainNavigation from './shared/components/Navigation/MainNavigation';

export default function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Routes>
          <Route path='/' exact="true" element={< Users />} />
          <Route path='/:userId/places' exact="true" element={<UserPlaces />} />
          <Route path='/places/new' exact="true" element={<NewPlace />} />
          <Route path='/places/:placeId' exact="true" element={<UpdatePlace />} />
          <Route path="auth" exact="true" element={<Auth />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </main>
    </Router >
  );
}