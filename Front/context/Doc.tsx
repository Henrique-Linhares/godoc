"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type ProviderType = {
  doc: any[];
  setDoc: React.Dispatch<React.SetStateAction<any[]>>;
};

type DocProviderProps = {
  children: ReactNode;
};

const DocContext = createContext<ProviderType | undefined>(undefined);

export function DocProvider({ children }: DocProviderProps) {
  const [doc, setDoc] = useState<any[]>([]);

  return (
    <DocContext.Provider value={{ doc, setDoc }}>
      {children}
    </DocContext.Provider>
  );
}

export function useDoc() {
  const context = useContext(DocContext);

  if (!context) {
    throw new Error("useDoc deve ser usado dentro de DocProvider");
  }

  return context;
}