import { createContext } from "react";

const UserContext = createContext({
  user: "JohnnyDepp",
  setUser: () => {},
});

export default UserContext;
