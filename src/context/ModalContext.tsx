import React, { createContext, useContext, useState } from 'react';

interface ModalContextType {
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  isPickerActive: boolean;
  setPickerActive: (active: boolean) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isPickerActive, setPickerActive] = useState(false);

  return (
    <ModalContext.Provider 
      value={{ 
        activeModal, 
        setActiveModal,
        isPickerActive,
        setPickerActive
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
}