import React from 'react';
import { useCharacter } from '../main/character/characterContext';
import { CharacterDisplay } from '../main/character/character';
import styles from './character.module.css';

export default function CharacterPage() {
  const { character } = useCharacter();

  return (
    <div className={styles.container}>
      <h1>Character Profile</h1>
      <CharacterDisplay character={character} />
    </div>
  );
}
