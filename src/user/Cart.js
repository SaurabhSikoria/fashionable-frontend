import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { getOneProduct } from "../core/helper/coreapicalls";
import { updateCartItemsQuantity } from "./helper/carthelper";
import DropIn from "braintree-web-drop-in-react";
import { Api } from "../backend";

const Cart = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { token, user } = useSelector((state) => state.auth.user);
  const items = useSelector((state) => state.cart.items);

  const [cartItems, setCartItems] = useState([]);
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    getToken();
  }, [token]);

  useEffect(() => {
    items.map((item) => {
      getOneProduct(item.product)
        .then((product) => {
          setCartItems((prevItems) => {
            const itemIndex = prevItems.findIndex(
              (item) => item._id === item.product
            );

            if (itemIndex !== -1) {
              const updatedCartItems = [...prevItems];
              updatedCartItems[itemIndex] = {
                ...product,
                quantity: item.quantity,
              };
              return updatedCartItems;
            } else {
              product.quantity = item.quantity;
              return [...prevItems, product];
            }
          });
        })
        .catch((err) => console.log(err));
    });
  }, [items]);

  const getToken = async () => {
    try {
      const data = await fetch(`${Api}/${user._id}/braintree/token`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (data.success) setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const emptyCart = async (userId) => {
    await fetch(`${Api}/cart/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

  const handleCheckout = async () => {
    try {
      let orderItems = cartItems.map(
        ({ picture, stock, sold, ...rest }) => rest
      );
      const { nonce } = await instance.requestPaymentMethod();
      await fetch(`${Api}/${user._id}/braintree/payment`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nonce, cart: orderItems }),
      })
        .then((res) => {
          console.log(res);
          if (res.ok === true) {
            setPaymentSuccess(true);
            emptyCart(user._id);
            <Redirect to={`'/user/ordes/${user._id}`} />;
          }
        })
        .catch((err) => console.log(`Payment Error: ${err}`));
    } catch (error) {
      console.log(error);
    }
  };

  const paymentSuccessMessage = () => (
    <div>
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Your Order has been Placed Successfully!
              </h5>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPaymentSuccess(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>
  );

  const decreaseQuantity = (index, productId) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity--;
      setCartItems(updatedCartItems);

      updateCartItemsQuantity(user._id, token, productId, -1)
        .then((cart) => {
          console.log("Your Cart has been updated!");
        })
        .catch((err) => console.log(err));
    }
  };

  const increaseQuantity = (index, productId) => {
    updateCartItemsQuantity(user._id, token, productId, 1)
      .then((cart) => {
        console.log("Your Cart has been updated!");
      })
      .catch((err) => console.log(err));

    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity++;
    setCartItems(updatedCartItems);
  };

  const imagehelper = (picture) => {
    if (picture) {
      const bufferData = new Uint8Array(picture.data.data);
      const blob = new Blob([bufferData], {
        type: picture.contentType,
      });
      const imageURL = URL.createObjectURL(blob);
      return (
        <img src={imageURL} alt="Product" className="img-fluid cart-image" />
      );
    } else
      return (
        <img
          src={`https://media.istockphoto.com/id/1404885250/photo/mahabaleshwar-and-panchagani-nature-and-hill-areas.jpg?s=1024x1024&w=is&k=20&c=fQykGjPmlabwiSYYgvanP97qMZD7dT_8v81iGqWdimU=`}
          alt="Product"
          className="img-fluid cart-image"
        />
      );
  };

  return (
    <Base>
      {isAuthenticated ? (
        <div className="container-fluid mt-4">
          <h2 className="text-center mb-4">Shopping Cart</h2>
          <div className="row p-4">
            <div className="col-md-8 px-5">
              <div className="card mb-3">
                <div className="card-body">
                  {cartItems &&
                    cartItems.map((item, index) => (
                      <div
                        key={item._id}
                        className="row align-items-center border-bottom py-3 my-3 bg-light rounded"
                      >
                        <div className="col-md-3">
                          {imagehelper(item.picture)}
                        </div>
                        <div className="col-md-6">
                          <h5>{item.name}</h5>
                        </div>
                        <div className="col-md-3">
                          <div className="text-center">
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => decreaseQuantity(index, item._id)}
                            >
                              -
                            </button>
                            <span className="mx-4">{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => increaseQuantity(index, item._id)}
                            >
                              +
                            </button>
                          </div>
                          <p className="text-center mt-4">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Summary</h5>
                  <p className="card-text">
                    Total Items:{" "}
                    {cartItems.reduce(
                      (total, item) => total + item.quantity,
                      0
                    )}
                  </p>
                  <p className="card-text">
                    Total Price: $
                    {cartItems
                      .reduce(
                        (total, item) => total + item.price * item.quantity,
                        0
                      )
                      .toFixed(2)}
                  </p>
                  <div className="mt-3">
                    {clientToken && (
                      <DropIn
                        options={{
                          authorization: clientToken,
                          // paypal: {
                          //   flow: "vault",
                          // },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                    )}
                    <button
                      disabled={!clientToken}
                      className="btn btn-success rounded"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>
          <Link to="/signin">Login</Link> to access to your Cart
        </h4>
      )}
      {paymentSuccess && paymentSuccessMessage()}
    </Base>
  );
};

export default Cart;
