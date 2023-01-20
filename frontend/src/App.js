import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Users from './user/pages/Users';
import NewPlace from './places/pages/NewPlace';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={< Users />} />
        <Route path='/places/new' element={<NewPlace />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router >
  );
}