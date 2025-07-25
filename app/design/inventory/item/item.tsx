import React from 'react';
import styles from './item.module.css';

export interface ItemProps {
  id?: string;
  name?: string;
  quantity?: number;
  icon?: string;
  rarity?: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  onClick?: () => void;
}

export const Item: React.FC<ItemProps> = ({
  id,
  name,
  quantity = 0,
  icon = '',
  rarity = 'common',
  onClick
}) => {
  // Determine if the item slot is empty
  const isEmpty = !id && !name;
  
  // Handle item click
  const handleClick = () => {
    if (onClick && !isEmpty) {
      onClick();
    }
  };
  
  // Get display icon - default to a placeholder if not provided
  const displayIcon = icon || '❓';
  
  return (
    <div 
      className={`
        ${styles.itemContainer} 
        ${styles[rarity]} 
        ${isEmpty ? styles.empty : styles.filled}
        ${onClick && !isEmpty ? styles.clickable : ''}
      `}
      onClick={handleClick}
      title={isEmpty ? 'Empty Slot' : name}
      data-item-id={id || 'empty'}
    >
      {!isEmpty ? (
        <>
          <div className={styles.iconContainer}>
            <span className={styles.icon}>{displayIcon}</span>
          </div>
          
          <div className={styles.name}>{name}</div>
          
          {quantity > 0 && (
            <div className={styles.quantity}>
              {quantity > 999 ? '999+' : quantity}
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

export default Item;
