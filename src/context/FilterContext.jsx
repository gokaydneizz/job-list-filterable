import {useState} from 'react';
import {createContext} from 'react';

export const FilterContext = createContext();

export const FilterContextProvider = ({children}) => {
  const [filters, setFilters] = useState([]);

  return (
    <FilterContext.Provider value={{filters, setFilters}}>
      {children}
    </FilterContext.Provider>
  );
};
