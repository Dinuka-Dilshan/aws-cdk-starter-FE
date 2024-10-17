import { createContext, PropsWithChildren, useContext, useState } from "react";
import Loader from "../components/Loader";

type LoaderContext = {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

const LoaderContext = createContext<LoaderContext>({
  isLoading: false,
  setIsLoading: () => null,
});

export const useLoader = () => useContext(LoaderContext);

const LoaderProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoaderContext.Provider>
  );
};

export default LoaderProvider;
