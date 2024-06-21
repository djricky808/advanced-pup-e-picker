import { ReactNode } from "react";
import { useDogs } from "../providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { allDogs, activeTab, handleTabClick } = useDogs();

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite === true);

  const unFavoritedDogs = allDogs.filter((dog) => dog.isFavorite === false);

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("favorited");
            }}
          >
            favorited ( {favoritedDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              activeTab === "unfavorited" ? "active" : ""
            }`}
            onClick={() => {
              handleTabClick("unfavorited");
            }}
          >
            unfavorited ( {unFavoritedDogs.length} )
          </div>
          <div
            className={`selector ${activeTab === "createDog" ? "active" : ""}`}
            onClick={() => {
              handleTabClick("createDog");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
