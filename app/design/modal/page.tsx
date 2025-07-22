import React from 'react';
import { ModalProvider } from './modalContext';
import ModalExample from './modal.example';

export default function ModalPage() {
  return (
    <ModalProvider>
      <ModalExample />
    </ModalProvider>
  );
}
