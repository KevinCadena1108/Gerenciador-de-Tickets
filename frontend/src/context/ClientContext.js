import React, { createContext, useState } from "react";

export const ClientContext = createContext();

export const ClientProvider = ({ children }) => {
  const [cpf, setCpf] = useState("");

  return (
    <ClientContext.Provider value={{ cpf, setCpf }}>
      {children}
    </ClientContext.Provider>
  );
};