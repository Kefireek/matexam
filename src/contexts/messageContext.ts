import { createContext } from "react";

const messageContext = createContext({
  message: null,
  setMessage: (message) => {}
} as {message: Message | null, setMessage: (message: Message | null) => any});

export interface Message {
  title: string;
  description: string | null;
  status: "success" | "loading" | "info" | "warning" | "error" | undefined;
  duration?: number;
}

export default messageContext;