import { Api } from "../../backend";

export const updateUser = async (userId, token, user) => {
  return await fetch(`${Api}/user/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: user,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

export const getUserOrders = (userId, token) => {
  return fetch(`${Api}/order/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
