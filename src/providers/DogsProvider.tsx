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
  createDog: (dog: Omit<Dog, "id">) => Promise<unknown>;
  favoriteDog: (id: number) => void;
  unFavoriteDog: (id: number) => void;
  deleteDog: (id: number) => void;
  activeTab: TDogTabs | null;
  handleTabClick: (tab: TDogTabs) => void;
  isLoading: boolean;
};

const DogsContext = createContext<TDogsProvider>({} as TDogsProvider);

export const DogsProvider = ({ children }: { children: ReactNode }) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TDogTabs | null>(null);
  const [isLoading] = useState<boolean>(false);

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
    return Requests.postDog(dog)
      .then(() => refetchDogs())
      .catch(() => toast.error("Could not add dog!"));
  };

  const favoriteDog = (dogID: number) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogID ? { ...dog, isFavorite: true } : dog
      )
    );
    Requests.patchFavoriteForDog(dogID, { isFavorite: true })
      .then(() => {
        return;
      })
      .catch(() => {
        setAllDogs(allDogs);
        toast.error("Could not favorite dog!");
      });
  };

  const unFavoriteDog = (dogID: number) => {
    setAllDogs(
      allDogs.map((dog) =>
        dog.id === dogID ? { ...dog, isFavorite: false } : dog
      )
    );
    Requests.patchFavoriteForDog(dogID, { isFavorite: false })
      .then(() => {
        return;
      })
      .catch(() => {
        setAllDogs(allDogs);
        toast.error("Could not unfavorite dog!");
      });
  };

  const deleteDog = (dogID: number) => {
    Requests.deleteDogRequest(dogID)
      .then(() => refetchDogs())
      .catch(() => toast.error("Could not delete dog!"));
  };

  const handleTabClick = (tab: TDogTabs) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <DogsContext.Provider
      value={{
        allDogs,
        setAllDogs,
        createDog,
        favoriteDog,
        unFavoriteDog,
        deleteDog,
        activeTab,
        handleTabClick,
        isLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);
