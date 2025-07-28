'use client';

import React from 'react';
import { CharacterProvider } from './character/characterContext';
import { AlertProvider } from '../design/alert/alert';
import { ModalProvider } from '../design/modal/modalContext';
import { ActiveJobProvider } from './job/activeJobContext';
import styles from './layout.module.css';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AlertProvider>
      <ModalProvider>
        <CharacterProvider>
          <ActiveJobProvider>
            <div className={styles.layout}>
              <main className={styles.main}>{children}</main>
            </div>
          </ActiveJobProvider>
        </CharacterProvider>
      </ModalProvider>
    </AlertProvider>
  );
}
