import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartData, removeFromCart } from "../features/cartSlice";

const Card = ({ product }) => {
  const [image, setImage] = useState("");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartError = useSelector((state) => state.cart.error);
  const isItemInCart = cartItems.some((item) => item.product === product._id);

  useEffect(() => {
    if (product?.picture?.data) {
      const bufferData = new Uint8Array(product.picture.data.data);
      const blob = new Blob([bufferData], {
        type: product.picture.contentType,
      });
      const imageURL = URL.createObjectURL(blob);
      setImage(imageURL);
    }
  }, [product]);

  return (
    <div className="card card-menu mx-3 mb-4 cursor-pointer">
      <img className="card-image" src={image} alt="shoes" />
      <div className="card-body p-0 d-flex flex-column">
        <h4 className="card-title m-2">{product.name}</h4>
        <h4 className="card-price m-2">$ {product.price}</h4>
        <p className="card-description m-2">{product.description}</p>
        <div className="card-btn m-2 d-flex justify-content-between">
          {isItemInCart ? (
            <button
              className="btn btn-danger card-btn"
              onClick={() => dispatch(removeFromCart(product._id))}
            >
              Remove In Cart
            </button>
          ) : (
            <button
              className="btn btn-warning card-btn"
              onClick={() => dispatch(fetchCartData(product._id))}
            >
              Add To Cart
            </button>
          )}
          <button className="btn btn-success card-btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
