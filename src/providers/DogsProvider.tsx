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
  createDog:(dog: Omit<Dog, 'id'>) => void;
  favoriteDog: (id: number) => void;
  unFavoriteDog: (id: number) => void;
  deleteDog: (id: number) => void;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<TDogTabs>>;
  isLoading: boolean;
};

const DogsContext = createContext<TDogsProvider>({} as TDogsProvider);

export const PDogsProvider = ({children} : {children: ReactNode}) => {
  const [allDogs, setAllDogs] = useState<Dog[]>([]);
  const [activeTab, setActiveTab] = useState<TDogTabs>("none");
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

  const createDog = (dog: Omit<Dog,'id'>) => {
    Requests.postDog(dog)
    .then(() => refetchDogs())
    .catch(() => toast.error('Could not add dog!'))
  }

  const favoriteDog = (dogID: number) => {
    setAllDogs(
      allDogs.map((dog) => 
      dog.id === dogID ? {...dog, isFavorite: true} : dog
      )
    );
    Requests.patchFavoriteForDog(dogID, {isFavorite: true})
    .then(() => {
       return;
    }).catch(()=>{
      setAllDogs(allDogs)
      toast.error('Could not favorite dog!')});
  }
  
  const unFavoriteDog = (dogID: number) => {
    setAllDogs(
      allDogs.map((dog) =>
      dog.id === dogID ? {...dog, isFavorite: false} : dog
    )
    );
    Requests.patchFavoriteForDog(dogID, {isFavorite: false})
    .then(() => {
      return;
    }).catch(() => {
      setAllDogs(allDogs);
      toast.error("Could not unfavorite dog!")
    });
  }

  const deleteDog = (dogID: number) => {
    Requests.deleteDogRequest(dogID)
    .then(() => refetchDogs())
    .catch(() => toast.error('Could not delete dog!'))
  }

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
        setActiveTab,
        isLoading,
      }}
    >
      {children}
    </DogsContext.Provider>
  );
};

export const useDogs = () => useContext(DogsContext);