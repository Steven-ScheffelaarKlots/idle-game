'use client';

import React, { useState } from 'react';
import { useCharacter } from '../character/characterContext';
import ItemGrid from '../../design/inventory/itemGrid/itemGrid';
import styles from './inventoryView.module.css';
import { InventoryItem } from '../character/character';
import ItemDetailsPanel from '../../design/inventory/itemDetailsPanel/itemDetailsPanel';

const InventoryView: React.FC = () => {
  const { character } = useCharacter();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  
  if (!character) {
    return <div>Loading character data...</div>;
  }

  const inventoryItems = character.inventory;
  
  return (
    <div className={styles.inventoryContainer}>
      <div className={styles.mainContent}>
        <div className={styles.inventorySection}>
          <h2 className={styles.inventoryTitle}>Inventory</h2>
          <div className={styles.inventoryStats}>
            <span>Items: {Object.keys(inventoryItems).length}</span>
          </div>
          <ItemGrid 
            items={inventoryItems}
            onItemClick={(item: InventoryItem) => {
              setSelectedItem(item);
              console.log(`Selected ${item.item.name}, quantity: ${item.quantity}`);
            }}
          />
        </div>
        
        <div className={styles.detailsSection}>
          <ItemDetailsPanel 
            selectedItem={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        </div>
      </div>
    </div>
  );
};

export default InventoryView;
