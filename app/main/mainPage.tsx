import React from 'react';
import Mining from '../skills/mining/miningView';
import { CharacterProvider, useCharacter } from './character/characterContext';
import { CharacterDisplay } from './character/character';

const MainPage: React.FC = () => {
    return (
        <CharacterProvider>
            <div className="main-page">
                <h1>Main Page</h1>
                <CharacterInfo />
                <Mining />
            </div>
        </CharacterProvider>
    );
};

// Simple component to display character info
const CharacterInfo: React.FC = () => {
    const { character } = useCharacter();
    return <CharacterDisplay character={character} />;
};

export default MainPage;