import { Dog } from "./types";

const baseURL = "http://localhost:3000";

const getAllDogs = (): Promise <Dog[]> => {
  // fill out method
  return fetch(`${baseURL}/dogs`)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Could not fetch dogs");
    }
    return response.json();
  })
  .then((data) => data as Dog[])
  .catch(() => { 
    console.error("Could not fetch dogs");
    return []});
};

const postDog = (dog: Omit<Dog,'id'>) => {
  // fill out method
  return fetch(`${baseURL}/dogs`, {
    method: "POST",
    body: JSON.stringify(dog),
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    if (!response.ok) throw new Error("Could not post dog");

    return response.json();
  });
};

const deleteDogRequest = (id: number) => {
  // fill out method
  return fetch(`${baseURL}/dogs/${id}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) throw new Error("Could not delete dog");
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
    if (!response.ok) throw new Error("Could not update dog");
    return response.json();
  });
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
