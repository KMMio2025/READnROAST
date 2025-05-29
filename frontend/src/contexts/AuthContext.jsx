import React, { createContext, useState, useEffect } from "react";
import { fetchUserIsLoggedIn, fetchLogOut } from "../http.js";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
  const [user, setUser] = useState();

  async function logIn(userData) {
    setIsLoggedIn(true);
    if (userData) {
      setUser(userData);
    }
  }
  

  async function logOut() {
    try {
      await fetchLogOut();
      setIsLoggedIn(false);
      setUser(undefined);
    } catch (error) {
      setError({
        message: error.message || "Failed to log out, please try again.",
      });
    }
  }

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
          setUser(undefined);
        }
      } catch (error) {
        setError({
          message: error.message || "Could not fetch data, please try again.",
        });
        setIsLoggedIn(false);
        setUser(undefined);
      } finally {
        setIsFetching(false);
      }
    }
    fetchIsLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, isFetching, error, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}