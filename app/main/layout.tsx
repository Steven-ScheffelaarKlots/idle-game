import React from 'react';
import { CharacterProvider } from './character/characterContext';
import { AlertProvider } from '../design/alert/alert';
import { ModalProvider } from '../design/modal/modalContext';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <ModalProvider>
        <CharacterProvider>
          {children}
        </CharacterProvider>
      </ModalProvider>
    </AlertProvider>
  );
}
