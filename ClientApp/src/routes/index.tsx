import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'
import AddPage from '../pages/AddPage'
import EditPage from '../pages/EditPage'


const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/add" element={<AddPage />} />
    <Route path="/edit/:Id" element={<EditPage />} />
  </Routes>
);

export default AppRoutes;
