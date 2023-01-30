import { createContext } from "react";

export const AuthContect = createContext({
  isLoggedIn: false,
  login: () => { },
  logout: () => { }
});