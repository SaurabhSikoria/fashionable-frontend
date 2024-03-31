import React, { useEffect, useState } from "react";
import { Api } from "../backend";
import { useSelector } from "react-redux";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { token, user } = useSelector((state) => state.auth.user);

  useEffect(() => {
    getUserOrders();
  }, [orders]);

  const getUserOrders = () => {
    return fetch(`${Api}/order/${user._id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const orderCart = () => <div className="order-card"></div>;

  return (
    <div className="container-fluid">
      <h2 className="user-orders">Your Orders</h2>
      {orders ? orders.map() : <h6>Place some orders to view here</h6>}
    </div>
  );
};

export default Orders;
