import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Chat from './Chat.jsx';
import Settings from './Settings.jsx';
import SearchUsers from './SearchUsers.jsx';
import Contacts from './Contacts.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/search-users" element={<SearchUsers />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default AppRoutes;
