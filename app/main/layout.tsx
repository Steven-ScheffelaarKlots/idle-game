'use client';

import React from 'react';
import { CharacterProvider } from './character/characterContext';
import { AlertProvider } from '../design/alert/alert';
import { ModalProvider } from '../design/modal/modalContext';
import styles from './layout.module.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <ModalProvider>
        <CharacterProvider>
          <div className={styles.layout}>
            <main className={styles.main}>{children}</main>
          </div>
        </CharacterProvider>
      </ModalProvider>
    </AlertProvider>
  );
}
