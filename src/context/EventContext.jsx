import { createContext, useState } from "react";

export const EventContext = createContext();

export function EventProvider({ children }) {
  const [event, setEvent] = useState(null);

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
}
