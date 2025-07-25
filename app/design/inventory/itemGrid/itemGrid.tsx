'use client';

import React from 'react';
import { Item, ItemProps } from '../item/item';
import styles from './itemGrid.module.css';

export interface ItemGridProps {
  items: ItemProps[];
  emptySlots?: number;
  gridClassName?: string;
  onItemClick?: (item: ItemProps, index: number) => void;
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
  const handleItemClick = (item: ItemProps, index: number) => {
    if (onItemClick && item.id) {
      onItemClick(item, index);
    }
  };
  
  return (
    <div className={`${styles.gridContainer} ${gridClassName}`}>
      {/* Render all items */}
      {items.map((item, index) => (
        <Item
          key={`item-${item.id || index}`}
          {...item}
          onClick={() => handleItemClick(item, index)}
        />
      ))}
      
      {/* Render empty slots */}
      {Array.from({ length: emptySlots }).map((_, index) => (
        <Item key={`empty-${index}`} />
      ))}
      
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
