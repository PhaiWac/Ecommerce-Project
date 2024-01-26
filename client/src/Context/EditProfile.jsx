// context.js
import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext(); 

export const ProfileProvider = ({ children }) => {
  const [ProfileValue, setVal] = useState();

  const SetProfile = (newValues) => {
    setVal(newValues);
  };

  return (
    <ProfileContext.Provider value={{ ProfileValue, SetProfile }}> 
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);

  return context;
};
