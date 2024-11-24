import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Chat from './Chat.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default AppRoutes;
