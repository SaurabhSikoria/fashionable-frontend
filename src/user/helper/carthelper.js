import { Api } from "../../backend";

export const addToCart = async (userId, token, productId) => {
  return await fetch(`${Api}/cart/${userId}/${productId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const fetchCart = async (userId, token) => {
  return await fetch(`${Api}/cart/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("Unable to fetch the cart:" + err));
};

export const removeItemFromCart = async (userId, token, productId) => {
  return await fetch(`${Api}/cart/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log("Not Removed due to" + err));
};

export const updateCartItemsQuantity = async (
  userId,
  token,
  productId,
  updateVariable
) => {
  const payload = { quantity: updateVariable };
  return await fetch(`${Api}/cart/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })
    .then((res) => res.json())
    .catch((err) => console.log("Unable to make changes to cart" + err));
};
