'use client';

import React from 'react';
import tabsObject from './tabs';
import Sidebar from '../design/sidebar';

const MainPage: React.FC = () => {

    const [activeTab, setActiveTab] = React.useState(0);

    const tabs = tabsObject
    const ActiveTabComponent = tabs[activeTab].path;

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

export default MainPage;