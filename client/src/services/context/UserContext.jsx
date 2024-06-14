import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { profileUser } from "../api/auth";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      profileUser()
        .then(({ data }) => {
          setUser(data);
          setReady(true);
        })
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};