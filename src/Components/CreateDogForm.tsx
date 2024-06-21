import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../providers/DogsProvider";
import toast from "react-hot-toast";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { createDog, isLoading, handleTabClick } = useDogs();

    const [dogName, setDogName] = useState("");
    const [dogDescription, setDogDescription] = useState("");
    const [selectedImage, setSelectedImage] = useState(dogPictures.BlueHeeler);

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          createDog({
            name: dogName,
            image: selectedImage,
            description: dogDescription,
            isFavorite: false,
          })
            .then(() => {
              setDogName("");
              setDogDescription("");
              setSelectedImage("");
              handleTabClick("createDog");
              toast.success("Dog Created");
            })
            .catch(() => {
              toast.error("Could not create dog!");
            });
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input
          type="text"
          onChange={(e) => {
            setDogName(e.target.value);
          }}
          placeholder="Dog Name"
          value={dogName}
          disabled={isLoading}
        />
        <label htmlFor="description">Dog Description</label>
        <textarea
          name=""
          id=""
          cols={80}
          rows={10}
          onChange={(e) => {
            setDogDescription(e.target.value);
          }}
          placeholder="Dog Description"
          value={dogDescription}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          id=""
          onChange={(e) => {
            setSelectedImage(e.target.value);
          }}
          value={selectedImage}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  };
