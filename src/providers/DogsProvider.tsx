import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Dog, TDogTabs } from "../types";
import { Requests } from "../api";
import toast from "react-hot-toast";

type TDogsProvider = {
  allDogs: Dog[];
  setAllDogs: Dispatch<SetStateAction<Dog[]>>;
  createDog: (dog: Omit<Dog, "id">) => Promise<string | void>;
  updateFavoriteDog: (id: number, isFavorite: boolean) => Promise<void>;
  deleteDog: (id: number) => Promise<void>;
  activeTab: TDogTabs;
  handleTabClick: (tab: TDogTabs) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  dogsList: Record<TDogTabs, Dog[]>;
};

const DogsContext = createContext<TDogsProvider>({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TDogTabs>("all");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refetchDogs = () => {
    Requests.getAllDogs()
      .then((dogs) => setAllDogs(dogs))
      .catch(() => {
        toast.error("Could not get dogs.");
      });
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  const createDog = (dog: Omit<Dog, "id">) => {
    setIsLoading(true);
    return Requests.postDog(dog)
      .then(() => refetchDogs())
      .catch(() => toast.error("Could not add dog!"))
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
        allDogs,
        setAllDogs,
        createDog,
        updateFavoriteDog,
        deleteDog,
        activeTab,
        handleTabClick,
        isLoading,
        setIsLoading,
        dogsList,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
