import { Dog } from "./types";

const baseURL = "http://localhost:3000";

const getAllDogs = () => {
  // fill out method
  return fetch(`${baseURL}/dogs`).then((response) => {
    if (!response.ok) {
      throw new Error(
        `HTTP failed with the status code of : ${response.status}`
      );
    }
    return response.json();
  });
};

const postDog = (dog: Omit<Dog, "id">) => {
  // fill out method
  return fetch(`${baseURL}/dogs`, {
    method: "POST",
    body: JSON.stringify(dog),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok)
      throw new Error(
        `HTTP failed with the status code of : ${response.status}`
      );
    return response.json();
  });
};

const deleteDogRequest = (id: number) => {
  // fill out method
  return fetch(`${baseURL}/dogs/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok)
      throw new Error(
        `HTTP failed with the status code of : ${response.status}`
      );
    return response.json();
  });
};

const patchFavoriteForDog = (id: number, body: Partial<Dog>) => {
  // fill out method
  return fetch(`${baseURL}/dogs/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok)
      throw new Error(
        `HTTP failed with the status code of : ${response.status}`
      );
    return response.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
