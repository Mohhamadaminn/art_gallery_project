import apiClient from "./client";

export const getCart = () => apiClient.get("/cart/").then((res) => res.data);

export const addToCart = (itemType, objectId) =>
  apiClient
    .post("/cart/add/", { item_type: itemType, object_id: objectId })
    .then((res) => res.data);

export const removeFromCart = (itemId) =>
  apiClient.delete(`/cart/remove/${itemId}/`).then((res) => res.data);

export const checkout = (paymentMethod) =>
  apiClient
    .post("/checkout/", { payment_method: paymentMethod })
    .then((res) => res.data);

export const getOrderHistory = () =>
  apiClient.get("/orders/").then((res) => res.data);