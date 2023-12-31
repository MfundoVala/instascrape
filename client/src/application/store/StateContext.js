import React, { useState, createContext, useContext } from "react";

const StateContext = createContext();
const brandColors = {
  primary: "#714CF9",
  secondary: "#F5E8FE",
  accent: "#F7F2FB",
  purple: "#2F1A44",
  white: "#FFFDFB",
  yellow: "#FAD74A",
};

const ContextProvider = ({ children }) => {
  const [state, setState] = useState({});
  const [items, setItems] = useState(null);

  return (
    <StateContext.Provider
      value={[state, setState, brandColors, items, setItems]}
    >
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => useContext(StateContext);

export { ContextProvider, useStateContext };
