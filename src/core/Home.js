import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { getAllProducts } from "./helper/coreapicalls";
import { useDispatch } from "react-redux";
import { fetchCartData } from "../features/cartSlice";

const Home = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        if (data?.error) console.log(data.error);
        else setProducts(data);
      })
      .catch((err) => console.log(err));
    dispatch(fetchCartData());
  }, [dispatch]);

  return (
    <Base>
      <div className="home p-2">
        <div className="container-fluid mt-5">
          <div className="row">
            {products &&
              products.map((product, index) => {
                return (
                  <div key={index} className="col-md-3">
                    <Card product={product} />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      ;
    </Base>
  );
};

export default Home;
