import React from "react";
import Container from 'react-bootstrap/Container';

function Cart({ userId, totalProducts, totalQuantity, total, products }) {
  return (
    <>
      <Container>
        <h5>Cart:</h5>
        <ul>
          <li>User ID: {userId}</li>
          <li>Total Products: {totalProducts}</li>
          <li>Quantity: {totalQuantity}</li>
          <li>Total Sum: {total}$</li>
        </ul>
        <h5>Products:</h5>
        {products && products.length > 0 ? (
          products.map((product) => (
            <li key={product.id}>
              {product.title} | Price: {product.price}$ | Quantity: {product.quantity}
              <a href={"/products/"+product.id} className="btn btn-primary mx-2 p-1 my-1">Product Page</a>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </Container>
    </>
  );
}

export default Cart;
