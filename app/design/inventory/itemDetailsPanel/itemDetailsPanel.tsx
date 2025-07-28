import React from 'react';
import styles from './itemDetailsPanel.module.css';
import { InventoryItem } from '../../../main/character/character';

interface ItemDetailsPanelProps {
  selectedItem: InventoryItem | null;
  onClose: () => void;
}

const ItemDetailsPanel: React.FC<ItemDetailsPanelProps> = ({ selectedItem, onClose }) => {
  if (!selectedItem) {
    return (
      <div className={styles.detailsPanel}>
        <div className={styles.emptyState}>
          <p>Select an item to view details</p>
        </div>
      </div>
    );
  }

  const { item, quantity } = selectedItem;

  return (
    <div className={styles.detailsPanel}>
      <div className={styles.detailsHeader}>
        <h3 className={styles.detailsTitle}>{item.name}</h3>
        <button onClick={onClose} className={styles.closeButton}>×</button>
      </div>
      
      <div className={styles.itemIcon}>{item.icon || '📦'}</div>
      
      <div className={styles.detailsContent}>
        <div className={styles.detailRow}>
          <span className={styles.detailLabel}>Quantity:</span>
          <span className={styles.detailValue}>{quantity}</span>
        </div>
        
        {item.category && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Category:</span>
            <span className={styles.detailValue}>{item.category}</span>
          </div>
        )}
        
        {item.rarity && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Rarity:</span>
            <span className={`${styles.detailValue} ${styles[item.rarity]}`}>{item.rarity}</span>
          </div>
        )}
        
        {item.value && (
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Value:</span>
            <span className={styles.detailValue}>{item.value} gold</span>
          </div>
        )}
        
        {item.description && (
          <div className={styles.description}>
            <p>{item.description}</p>
          </div>
        )}
      </div>
      
      <div className={styles.detailsActions}>
        <button className={styles.actionButton}>Use</button>
        <button className={styles.actionButton}>Sell</button>
      </div>
    </div>
  );
};

export default ItemDetailsPanel;
