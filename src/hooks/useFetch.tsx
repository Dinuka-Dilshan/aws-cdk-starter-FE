import { useCallback, useState } from "react";
import { ApiStack } from "../../../space_finder/outputs.json";
import { useAuth } from "../Providers/AuthProvider";

const useFetch = <T, E = void>() => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<E | undefined>(undefined);
  const [data, setData] = useState<T | undefined>(undefined);
  const { user } = useAuth();

  const handleFetch = useCallback(
    async (
      path: string,
      method: "GET" | "POST" | "DELETE" | "PUT",
      body: object
    ) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${ApiStack.apiendpoint}${path}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: user?.token || "",
          },
          method,
          body: JSON.stringify(body),
        });

        const jsonData = (await response.json()) as T;
        setData(jsonData);
      } catch (error) {
        setError(JSON.stringify(error) as E);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return { isLoading, error, data, handleFetch };
};

export default useFetch;
