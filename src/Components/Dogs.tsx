// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)

import { useDogs } from "../providers/DogsProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  // no props allowed
  const {
    allDogs,
    favoriteDog,
    unFavoriteDog,
    deleteDog,
    isLoading,
    activeTab,
  } = useDogs();

  const filteredDogs = allDogs.filter((dog) => {
    if (activeTab === "favorited") {
      return dog.isFavorite;
    } else if (activeTab === "unfavorited") {
      return !dog.isFavorite;
    } else {
      return dog;
    }
  });

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {/* Make all the dog cards show up here */}
      {filteredDogs.map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onHeartClick={() => {
            unFavoriteDog(dog.id);
          }}
          onEmptyHeartClick={() => {
            favoriteDog(dog.id);
          }}
          onTrashIconClick={() => {
            deleteDog(dog.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
