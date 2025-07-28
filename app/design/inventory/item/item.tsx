import React from 'react';
import styles from './item.module.css';
import { InventoryItem } from '../../../main/character/character';

export interface ItemComponentProps {
  item: InventoryItem;
  onClick?: () => void;
}

export const ItemComponent: React.FC<ItemComponentProps> = ({
  item,
  onClick
}) => {
  // Determine if the item slot is empty
  const isEmpty = !item.item.id && !item.item.name;

  // Handle item click
  const handleClick = () => {
    if (onClick && !isEmpty) {
      onClick();
    }
  };
  
  // Get display icon - default to a placeholder if not provided
  const displayIcon = item.item.icon || '❓';
  
  return (
    <div 
      className={`
        ${styles.itemContainer} 
        ${styles[item.item.rarity]} 
        ${isEmpty ? styles.empty : styles.filled}
        ${onClick && !isEmpty ? styles.clickable : ''}
      `}
      onClick={handleClick}
      title={isEmpty ? 'Empty Slot' : item.item.name}
      data-item-id={item.item.id || 'empty'}
    >
      {!isEmpty ? (
        <>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{displayIcon}</span>
          </div>

          <div className={styles.name}>{item.item.name}</div>

          {item.quantity && item.quantity > 0 && (
            <div className={styles.quantity}>
              {item.quantity > 999 ? '999+' : item.quantity}
            </div>
          )}
        </>
      ) : (
        <div className={styles.emptySlot}>
          <span className={styles.emptyIcon}>+</span>
        </div>
      )}
    </div>
  );
};

export default ItemComponent;
