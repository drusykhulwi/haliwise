import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [results, setResults] = useState(null);

  return (
    <EventContext.Provider value={{ results, setResults }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEventContext() {
  const ctx = useContext(EventContext);
  if (!ctx) throw new Error('useEventContext must be used within EventProvider');
  return ctx;
}