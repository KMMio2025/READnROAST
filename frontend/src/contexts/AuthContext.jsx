import React from "react";
import { createContext, useState, useEffect, useContext } from "react";
import { fetchUserIsLoggedIn } from "../http.js";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [user, setUser] = useState();

  function logIn() {
    setIsLoggedIn(true);
  }
  function logOut() {
    setIsLoggedIn(false);
  }
  //using this hook so it only executes after refreshing the page
  useEffect(() => {
    async function fetchIsLoggedIn() {
      setIsFetching(true);

      try {
        const result = await fetchUserIsLoggedIn();

        if (result.isLoggedIn) {
          setIsLoggedIn(true);
          setUser(result.user);
        } else {
          setIsLoggedIn(false);
        }

        if (result.error) {
          setError({ message: result.error.message });
        }
      } catch (error) {
        setError({
          message: error.message || "Could not fetch data, please try again.",
        });
        setIsLoggedIn(false);
      } finally {
        setIsFetching(false);
      }
    }
    fetchIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, isFetching, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}
