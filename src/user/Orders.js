import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserOrders } from "./helper/userapicalls";
import UserDashboard from "./UserDashboard";

const Orders = ({ match }) => {
  const [orders, setOrders] = useState([]);
  const { token, user } = useSelector((state) => state.auth.user);

  useEffect(() => {
    getUserOrders(user._id, token)
      .then((data) => {
        setOrders(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const imagehelper = (picture) => {
    if (picture) {
      const bufferData = new Uint8Array(picture.data.data);
      const blob = new Blob([bufferData], {
        type: picture.contentType,
      });
      const imageURL = URL.createObjectURL(blob);
      return (
        <img src={imageURL} alt="Product" className="img-fluid order-image" />
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
    <UserDashboard>
      <div className="container-fluid">
        <h2 className="user-orders">Your Orders</h2>
        {orders ? (
          orders.map((order) => {
            return (
              <div key={order._id} className="container-fluid">
                {order.products?.map((product) => {
                  return (
                    <div
                      key={product._id}
                      className="row align-items-center border-bottom py-3 bg-light rounded"
                    >
                      {/* <h6 className="col-md-3">{order.status}</h6> */}
                      <div className="col-md-4">
                        {imagehelper(product.picture)}
                      </div>
                      <div className="col-md-5">{product.name}</div>
                      <div className="col-md-3">$ {product.price}</div>
                    </div>
                  );
                })}
              </div>
            );
          })
        ) : (
          <h6>Place some orders to view here</h6>
        )}
      </div>
    </UserDashboard>
  );
};

export default Orders;
