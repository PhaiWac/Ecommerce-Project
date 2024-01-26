// context.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'

const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [itemValues, setItemValues] = useState([]);

  const updateItemValues = (newValues) => {
    setItemValues(newValues);
  };

  return (
    <ItemContext.Provider value={{ itemValues, updateItemValues }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => {
  const context = useContext(ItemContext);

  if (!context) {
    throw new Error('useItemContext must be used within an ItemProvider');
  }

  return context;
};
