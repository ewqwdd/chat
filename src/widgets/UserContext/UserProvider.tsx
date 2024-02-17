import { ReactNode, useCallback, useMemo, useState } from "react";
import { User, userContext } from "./UserContext";
import { v4 as uuidv4 } from "uuid";

interface UserProviderProps {
  children: ReactNode;
}

export default function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User>();
  const [error, setError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userChange = useCallback(async (name: string, token_?: string) => {
    try {
      setIsLoading(true);
      setError(undefined);
      const token = token_ ?? uuidv4();
      localStorage.setItem("name", name);
      localStorage.setItem("token", token);
      setUser({ name, token });
    } catch (err) {
      setError(err as string);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("name");
    localStorage.removeItem("token");
    setUser(undefined);
  }, []);

  const value = useMemo(
    () => ({ user, setUser: userChange, error, isLoading, logout }),
    [user, userChange, error, isLoading, logout]
  );

  return <userContext.Provider value={value}>{children}</userContext.Provider>;
}
