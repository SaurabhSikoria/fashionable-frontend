import { Api } from "../../backend";

export const getAllProducts = async () => {
  return await fetch(`${Api}/products?page=1&limit=10`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getOneProduct = async (productId) => {
  return await fetch(`${Api}/product/${productId}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
// export const cartProducts = (userId, token) => {
//   return fetch()
// }
