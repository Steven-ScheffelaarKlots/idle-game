import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import styles from './modal.module.css';
import Button from '../button/button';

export interface ModalButton {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  buttons?: ModalButton[];
  size?: 'small' | 'medium' | 'large';
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  buttons = [],
  size = 'medium',
  closeOnEsc = true,
  closeOnOverlayClick = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (closeOnEsc && event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [closeOnEsc, isOpen, onClose]);

  const handleOverlayClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) {
        onClose();
      }
    },
    [closeOnOverlayClick, onClose]
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.open : styles.closing}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className={`${styles.modalContent} ${styles[`size-${size}`]}`}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className={styles.modalBody}>{children}</div>
        {buttons.length > 0 && (
          <div className={styles.modalFooter}>
            {buttons.map((button, index) => (
              <Button
                key={index}
                onClick={button.onClick}
                variant={button.variant || 'primary'}
                size={button.size || 'medium'}
              >
                {button.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
