import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, TDogTabs } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogsProvider = {
  createDog: (dog: Omit<Dog, "id">) => Promise<void>;
  updateFavoriteDog: (id: number, isFavorite: boolean) => Promise<void>;
  deleteDog: (id: number) => Promise<void>;
  activeTab: TDogTabs;
  handleTabClick: (tab: TDogTabs) => void;
  isLoading: boolean;
  dogsList: Record<TDogTabs, Dog[]>;
};

const DogsContext = createContext<TDogsProvider>({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TDogTabs>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchDogs = () => {
    return Requests.getAllDogs()
      .then((dogs: Dog[]) => setAllDogs(dogs))
      .catch(() => {
        toast.error("Could not get dogs.");
      });
  };

  useEffect(() => {
    void refetchDogs();
  }, []);

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => refetchDogs())
      .catch(() => {
        toast.error("Could not add dog!");
      })
      .finally(() => setIsLoading(false));
  };

  const updateFavoriteDog = (dogID: number, isFavorite: boolean) => {
    setAllDogs(
      allDogs.map((dog) => (dog.id === dogID ? { ...dog, isFavorite } : dog))
    );
    return Requests.patchFavoriteForDog(dogID, { isFavorite: isFavorite })
      .then(() => {
        return;
      })
      .catch(() => {
        setAllDogs(allDogs);
        toast.error("Could not update dog!");
      });
  };

  const deleteDog = (dogID: number) => {
    setAllDogs(allDogs.filter((dog) => dog.id !== dogID));
    return Requests.deleteDogRequest(dogID)
      .then(() => refetchDogs())
      .catch(() => {
        setAllDogs(allDogs);
        toast.error("Could not delete dog!");
      });
  };

  const favoritedDogs = allDogs.filter((dog) => dog.isFavorite);

  const unfavoritedDogs = allDogs.filter((dog) => !dog.isFavorite);

  const dogsList: Record<TDogTabs, Dog[]> = {
    all: allDogs,
    favorited: favoritedDogs,
    unfavorited: unfavoritedDogs,
    createDog: [],
  };

  const handleTabClick = (tab: TDogTabs) => {
    setActiveTab(tab);
  };

  return (
    <DogsContext.Provider
      value={{
        createDog,
        updateFavoriteDog,
        deleteDog,
        activeTab,
        handleTabClick,
        isLoading,
        dogsList,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
