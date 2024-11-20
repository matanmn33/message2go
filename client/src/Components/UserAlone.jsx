import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Cart from './Cart.jsx';

function UserAlone() {

  const [user, setUser] = useState({});
  const [cart, setCart] = useState({});
  const {id} = useParams();

  useEffect(() => {
    const getAllUserByID = async () => {
      let userRes = await fetch("https://dummyjson.com/users/" + id);
      let user = await userRes.json();
      setUser(user);
    };

    const getCartByID = async () => {
      let cartRes = await fetch("https://dummyjson.com/carts/" + id);
      let cart = await cartRes.json();
      setCart(cart);
    };

    getAllUserByID(); 
    getCartByID(); 
  }, []); 


  return (
    <>
      <Container>
        <h2 className="mt-3">User: {user.username}</h2>
        <ul>
         <li>Name: {user.firstName} {user.lastName}</li>
         <li>Age: {user.age} </li>
         <li>Email: {user.email} </li>
         <li>Phone: {user.phone} </li>
         <li>Gender: {user.gender} </li>
        </ul>
        <Cart userId={cart.userId} totalQuantity={cart.totalQuantity} totalProducts={cart.totalProducts} total={cart.total} products={cart.products}/>
      </Container>
    </>
  );
}

export default UserAlone;
