import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./style.scss";

import React from "react";
import Home from "./core/Home";
import Signin from "./core/Signin";
import Signup from "./core/Signup";
import AdminDashboard from "./admin/AdminDashboard";
import Cart from "./user/Cart";
import CreateCategory from "./admin/CreateCategory";
import AddProduct from "./admin/AddProduct";
import AdminRoute from "./admin/helper/AdminRoute";
import UserRoute from "./user/helper/UserRoute";
import ManageCategory from "./admin/ManageCategory";
import Orders from "./user/Orders";
import ManageProduct from "./admin/ManageProduct";
import UpdateProduct from "./admin/UpdateProduct";
import Profile from "./user/Profile";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <UserRoute path="/user/cart" exact component={Home} />
        <UserRoute path="/cart" component={Cart} />
        <UserRoute path="/user/profile/:user" component={Profile} />
        <UserRoute path="/user/orders" component={Orders} />
        <AdminRoute path="/admin/admindashboard" component={AdminDashboard} />
        <AdminRoute path="/category/create" component={CreateCategory} />
        <AdminRoute path="/category/manage" component={ManageCategory} />
        <AdminRoute path="/product/create" component={AddProduct} />
        <AdminRoute path="/product/manage" component={ManageProduct} />
        <AdminRoute
          path="/product/update/:productId"
          component={UpdateProduct}
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
