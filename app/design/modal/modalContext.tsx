import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import Modal, { ModalButton } from './modal';

interface ModalOptions {
  title: string;
  content: ReactNode;
  buttons?: ModalButton[];
  size?: 'small' | 'medium' | 'large';
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
}

interface ModalContextType {
  openModal: (options: ModalOptions) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOptions, setModalOptions] = useState<ModalOptions | null>(null);

  const openModal = useCallback((options: ModalOptions) => {
    setModalOptions(options);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Don't immediately remove content to allow for exit animation
    setTimeout(() => {
      setModalOptions(null);
    }, 300);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      {modalOptions && (
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalOptions.title}
          buttons={modalOptions.buttons}
          size={modalOptions.size}
          closeOnEsc={modalOptions.closeOnEsc}
          closeOnOverlayClick={modalOptions.closeOnOverlayClick}
        >
          {modalOptions.content}
        </Modal>
      )}
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
