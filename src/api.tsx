import { Dog } from "./types";

const baseURL = `http:/localhost:3000`;

const getAllDogs = (): Promise<Dog[]> => {
  // fill out method
  return fetch(`${baseURL}/dogs`).then((response) => response.json());
};

const postDog = (dog: Omit<Dog, "id">) => {
  // fill out method
  fetch(`${baseURL}/dogs`, {
    body: JSON.stringify(dog),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Could not create dog");
    return response.json();
  });
};
const deleteDogRequest = (id: number) => {
  // fill out method
  fetch(`${baseURL}/dogs/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) throw new Error("Could not delete dog");
    return response.json();
  });
};

const patchFavoriteForDog = (dog: Dog) => {
  // fill out method
  fetch(`${baseURL}/dog/${dog.id}`, {
    body: JSON.stringify(dog),
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) throw new Error("Could not update dog.");
    return response.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
