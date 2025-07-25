import React, { useState, useEffect } from 'react';
import { useCharacter } from '../../main/character/characterContext';
import { groupTabsByCategory, Tab } from '../../main/tabs';
import styles from './sidebar.module.css';


interface SidebarProps {
  defaultCollapsed?: boolean;
  tabs: Tab[];
  activeTab: string;
  onNavigate: (path: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  defaultCollapsed = false, 
  tabs,
  activeTab, 
  onNavigate 
}) => {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const { character } = useCharacter();

  // Toggle sidebar collapsed state
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    // Store preference in localStorage
    localStorage.setItem('sidebarCollapsed', String(!collapsed));
  };

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState !== null) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  const groupedTabs = groupTabsByCategory(tabs);
  console.log('Grouped Tabs:', groupedTabs);

  const handleNavigate = (path: string) => {
    console.log(`Navigating to: ${path}`);
    onNavigate(path);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarHeader}>
        <h2 className={styles.title}>{collapsed ? 'G' : 'Game Menu'}</h2>
        <button
          className={styles.collapseButton}
          onClick={toggleSidebar}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      {/* Character Profile Section */}
      <div className={styles.section}>
        <div 
          className={styles.sectionLink}
          onClick={() => handleNavigate('/character')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>👤</span>
            {!collapsed && <span className={styles.sectionTitle}>Character</span>}
          </div>
        </div>
        {!collapsed && (
          <div className={styles.characterInfo}>
            <p className={styles.characterName}>{character.name}</p>
            <div className={styles.healthBar}>
              <div
                className={styles.healthFill}
                style={{ width: `${(character.hp / character.maxHp) * 100}%` }}
              ></div>
              <span className={styles.healthText}>
                {character.hp}/{character.maxHp} HP
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Currency Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>💰</span>
          {!collapsed && <span className={styles.sectionTitle}>Currency</span>}
        </div>
        {!collapsed && (
          <div className={styles.currencyInfo}>
            <p className={styles.currencyAmount}>{character.currency}</p>
          </div>
        )}
      </div>

      {/* Skills Section */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionIcon}>⚒️</span>
          {!collapsed && <span className={styles.sectionTitle}>Skills</span>}
        </div>
        <div className={styles.skillList}>
          {groupedTabs.skills.tabs.map((skill) => (
            <div
              key={skill.id}
              onClick={() => handleNavigate(skill.name)}
              className={`${styles.skillItem} ${
                activeTab === skill.id ? styles.active : ''
              }`}
              role="button"
              tabIndex={0}
            >
              <div className={styles.skillIcon}>
                <span className={`fa ${skill.icon || 'fa-solid fa-hammer'}`}></span>
              </div>
              {!collapsed && (
                <div className={styles.skillInfo}>
                  <span className={styles.skillName}>{skill.name}</span>
                  {/* <span className={styles.skillLevel}>Lvl {skill.level}</span> */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inventory Link (optional) */}
      <div className={styles.section}>
        <div 
          className={styles.sectionLink}
          onClick={() => handleNavigate('/inventory')}
          role="button"
          tabIndex={0}
        >
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>🎒</span>
            {!collapsed && <span className={styles.sectionTitle}>Inventory</span>}
          </div>
          {!collapsed && character.inventory.length > 0 && (
            <span className={styles.inventoryCount}>{character.inventory.length}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
