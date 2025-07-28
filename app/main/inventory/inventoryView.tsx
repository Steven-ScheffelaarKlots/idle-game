'use client';

import React from 'react';
import { useCharacter } from '../character/characterContext';
import ItemGrid from '../../design/inventory/itemGrid/itemGrid';
import styles from './inventoryView.module.css';
import { InventoryItem } from '../character/character';

const InventoryView: React.FC = () => {
  const { character } = useCharacter();
  
  if (!character) {
    return <div>Loading character data...</div>;
  }

  const inventoryItems = character.inventory;
  
  return (
    <div className={styles.inventoryContainer}>
      <h2 className={styles.inventoryTitle}>Inventory</h2>
      <div className={styles.inventoryStats}>
        <span>Items: {Object.keys(inventoryItems).length}</span>
      </div>
      <ItemGrid 
        items={inventoryItems} // Directly use the inventory items
        onItemClick={(item: InventoryItem) => {
          // Handle item click if needed
          console.log(`Clicked on ${item.item.name}, quantity: ${item.quantity}`);
        }}
      />
    </div>
  );
};

export default InventoryView;
