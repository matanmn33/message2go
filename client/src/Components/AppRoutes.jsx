import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Chat from './Chat.jsx';
import Settings from './Settings.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default AppRoutes;
