import React, { useState } from "react";

const Context = React.createContext();

function ContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState("");
  const [currentThreadId, setCurrentThreadId] = useState(null);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        setUserData,
        currentThreadId,
        setCurrentThreadId,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
