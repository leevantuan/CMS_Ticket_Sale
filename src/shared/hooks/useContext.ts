import { createContext } from 'react';

export type studentContextType = {
  listStudents: any[];
  HandleUpdate: (id: string) => void;
  HandleDelete: (id: string) => void;
};
export const StudentContext = createContext<studentContextType | null>(null);
export const StudentContextProvider = StudentContext.Provider;
