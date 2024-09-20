import { createContext } from "react";

const UserContext = createContext({
  user: "tickle122",
  setUser: () => {},
});

export default UserContext;
