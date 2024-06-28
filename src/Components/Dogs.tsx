// Right now these dogs are constant, but in reality we should be getting these from our server
// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)

import { useDogs } from "../providers/DogsProvider";
import { DogCard } from "./DogCard";

export const Dogs = () => {
  // no props allowed
  const { updateFavoriteDog, deleteDog, isLoading, activeTab, dogsList } =
    useDogs();

  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {/* Make all the dog cards show up here */}
      {dogsList[activeTab].map((dog) => (
        <DogCard
          key={dog.id}
          dog={dog}
          onHeartClick={() => {
            void updateFavoriteDog(dog.id, false);
          }}
          onEmptyHeartClick={() => {
            void updateFavoriteDog(dog.id, true);
          }}
          onTrashIconClick={() => {
            void deleteDog(dog.id);
          }}
          isLoading={isLoading}
        />
      ))}
    </>
  );
};
