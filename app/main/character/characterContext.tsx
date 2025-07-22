import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Character } from './character';

// Create the context
interface CharacterContextType {
  character: Character;
  updateCharacter: (updatedCharacter: Character) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

// Create a provider component
export const CharacterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize with a default character
  const [character, setCharacter] = useState<Character>(new Character('Player'));

  const updateCharacter = (updatedCharacter: Character) => {
    setCharacter(updatedCharacter);
  };

  return (
    <CharacterContext.Provider value={{ character, updateCharacter }}>
      {children}
    </CharacterContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
