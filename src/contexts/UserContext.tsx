import React, { createContext, useState } from "react";
import { useAuth, useUser } from "../hooks/apiHooks";
import { AuthContextType, Values } from "../types/LocalTypes";

const UserContext = createContext<AuthContextType | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const { postLogin } = useAuth();
  const { getRoleByToken } = useUser();
  const isLoggedIn = localStorage.getItem("token");

  const handleLogin = async (values: Values) => {
    try {
      console.log(values);
      const result = await postLogin(values);
      if (result) {
        localStorage.setItem("token", result.data.data.token);
        setRole(result.data.data.role);
        console.log(result.data.data.role);
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleLogout = async () => {
    try {
      await localStorage.removeItem("token");
      setRole(null);
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = await localStorage.getItem("token");
      console.log(token, "token");
      if (token) {
        const result = await getRoleByToken(token);
        if (result) {
          setRole(result);
        }
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        role,
        handleLogin,
        handleLogout,
        handleAutoLogin,
        isLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
