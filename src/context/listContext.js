import * as React from "react";
import { createContext, useContext, useState } from "react";

const ListContext = createContext({});

export const ListContextProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [species, setSpecies] = useState([]);
  const [planets, setPlanets] = useState([]);

  return (
    <ListContext.Provider value={{
      people,
        setPeople,
        species,
        setSpecies,
        planets,
        setPlanets
    }}>
      {children}
    </ListContext.Provider>
  );
}

export const useListContext = () => {
  const context = useContext(ListContext);
  return context;
}
