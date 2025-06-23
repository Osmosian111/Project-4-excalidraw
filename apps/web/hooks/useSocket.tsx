import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket() {
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState<WebSocket>();

  useEffect(() => {
    const ws = new WebSocket(
      `${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3NDM1Y2FiYy1kZTQzLTRlOGItOWY1NC1mNjcxNTE3ZGRkY2QiLCJpYXQiOjE3NTAyMjQ2MDl9.wHx6JgaL4Cp_k3H_LR7wP6LGcT6vabdlPPF-s9a2WTc`
    );
    ws.onopen = () => {
      setLoading(false);
      setSocket(ws);
    };
  }, []);
  return { loading, socket };
}
