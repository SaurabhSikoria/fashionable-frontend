import { Api } from "../../backend";

export const createCategory = (userId, token, category) => {
  return fetch(`${Api}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getAllCategory = () => {
  return fetch(`${Api}/categories`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const removeCategory = async (userId, token, categoryId) => {
  return await fetch(`${Api}/category/${userId}/${categoryId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const createProduct = async (userId, token, product) => {
  return await fetch(`${Api}/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const removeProduct = async (userId, token, productId) => {
  return await fetch(`${Api}/product/${userId}/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const updateOneProduct = async (userId, token, productId, product) => {
  console.log(product);
  return await fetch(`${Api}/product/${userId}/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
