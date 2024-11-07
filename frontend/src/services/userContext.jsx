import { createContext, useEffect, useMemo, useState } from "react";
import { validateToken, getMe } from "../api/user";

const UserContext = createContext();

export function UserContextProvider({ children }) {
  const [connected, setConnected] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkSession = async () => {
    setIsLoading(true);
    if (token) {
      try {
        const verifiedToken = await validateToken();
        if (verifiedToken.userData) {
          setConnected(true);
          const userInfo = await getMe();
          setUser(userInfo);
          const roles = userInfo?.roles || [];
          setIsAdmin(roles.includes("admin"));
          setIsLoading(false);
        } else {
          setConnected(false);
          setIsAdmin(false);
          setUser(null);
          setToken(null);
          setIsLoading(false);
        }

        const now = new Date().getTime();
        const expToken = verifiedToken.exp * 1000;
        if (now > expToken) {
          localStorage.removeItem("token");
          setConnected(false);
          setIsAdmin(false);
          setUser(null);
          setToken(null);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        localStorage.removeItem("token");
        setConnected(false);
        setIsAdmin(false);
        setUser(null);
        setToken(null);
        setIsLoading(false);
      }
    } else {
      setIsAdmin(false);
      setConnected(false);
      setToken(null);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkSession();
  }, [token]);

  const contextData = useMemo(
    () => ({
      connected,
      setConnected,
      token,
      setToken,
      user,
      setUser,
      isAdmin,
      isLoading,
      checkSession,
    }),
    [connected, token, setConnected, user, setUser, isAdmin, isLoading]
  );

  return (
    <UserContext.Provider value={contextData}>{children}</UserContext.Provider>
  );
}

export default UserContext;
