import React, {useState, useEffect} from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Chat from './Chat.jsx';
import Users from './Users.jsx';
import UserAlone from './UserAlone.jsx';
import Cart from './Cart.jsx';
import Product from './Product.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserAlone />} />
      <Route path="/carts/:id" element={<Cart />} />
      <Route path="/products/:id" element={<Product />} />
    </Routes>
  );
}

export default AppRoutes;
