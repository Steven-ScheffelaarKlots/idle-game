'use client';

import React from 'react';
import tabsObject from './tabs';
// import { useCharacter } from './character/characterContext';
// import { CharacterDisplay } from './character/character';
import Sidebar from '../design/sidebar';

const MainPage: React.FC = () => {

    const [activeTab, setActiveTab] = React.useState(0);

    const tabs = tabsObject
    const ActiveTabComponent = tabs[activeTab].id;

    const handleNavigate = (id: string) => {
        setActiveTab(tabs.findIndex(tab => tab.id === id));
    }
    return (<>
        <Sidebar tabs={tabs} activeTab={tabs[activeTab].id} onNavigate={handleNavigate} />
            <div className="main-page">
                <ActiveTabComponent />
            </div>
            </>
    );
};

// Simple component to display character info
// const CharacterInfo: React.FC = () => {
//     const { character } = useCharacter();
//     return <CharacterDisplay character={character} />;
// };

export default MainPage;