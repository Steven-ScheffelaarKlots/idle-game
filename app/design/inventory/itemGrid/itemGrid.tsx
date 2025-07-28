'use client';

import React from 'react';
import { ItemComponent } from '../item/item';
import styles from './itemGrid.module.css';
import { InventoryItem } from '../../../main/character/character';

export interface ItemGridProps {
  items: InventoryItem[];
  emptySlots?: number;
  gridClassName?: string;
  onItemClick?: (item: InventoryItem) => void;
}

export const ItemGrid: React.FC<ItemGridProps> = ({
  items = [],
  emptySlots = 0,
  gridClassName = '',
  onItemClick
}) => {
  // Calculate total slots (items + empty slots)
  const totalSlots = items.length + emptySlots;
  
  // Handle item click
  const handleItemClick = (item: InventoryItem) => {
    if (onItemClick && item.item.id) {
      onItemClick(item);
    }
  };
  
  return (
    <div className={`${styles.gridContainer} ${gridClassName}`}>
      {/* Render all items */}
      {items.map((item, index) => (
        <ItemComponent
          key={`item-${item.item.id || index}`}
          item={item}
          onClick={() => handleItemClick(item)}
        />
      ))}
      
      {/* Render empty slots */}
      {/* {Array.from({ length: emptySlots }).map((_, index) => (
        <ItemComponent key={`empty-${index}`} />
      ))} */}
      
      {/* Show message when no items and no empty slots */}
      {totalSlots === 0 && (
        <div className={styles.noItems}>
          No items to display
        </div>
      )}
    </div>
  );
};

export default ItemGrid;
