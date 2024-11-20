import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import '../Styles/custom.css'

function Product() {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const getProductByID = async () => {
      let productRes = await fetch("https://dummyjson.com/products/" + id);
      let product = await productRes.json();
      setProduct(product);
    };
    getProductByID();
  });

  function productImages() {
    if (product.images) {
      return product.images.map((image, index) => (
        <img key={index} src={image} alt={product.title} className="img-thumbnail img-props m-2" />
      ));
    } else {
      return <p>No images available of this product.</p>;
    }
  }

  return (
    <>
      <Container>
        {productImages()}
        <h5>Product: {product.title}</h5>
        <p>Product ID: {product.id}</p>
        <p>Product Price: {product.price}$</p>
        <p>Product Category: {product.category}</p>
        <p>Product Description: {product.description}</p>
      </Container>
    </>
  );
}

export default Product;
