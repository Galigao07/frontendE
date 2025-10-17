import { useRef,useCallback ,useState} from "react";
import { LoginWebSocket,LogoutWebSocket,ExtendedDataWebSocket } from "../websocket";

type Message = any;

// export const useLoginSocket = () => {
//   const socketRef = useRef<WebSocket | null>(null);

//   const openSocket = async (): Promise<void> => {
//     if (socketRef.current) return;

//     const ws = await LoginWebSocket();
//     if (!ws) return;

//     socketRef.current = ws;

//     return new Promise((resolve) => {
//       ws.onopen = () => {
//         console.log("Login WebSocket connected");
//         resolve();
//       };
//       ws.onerror = (err) => console.error("Login WebSocket error:", err);
//     });
//   };

//   const sendMessage = (msg: Message) => {
//     if (socketRef.current?.readyState === WebSocket.OPEN) {
//       socketRef.current.send(JSON.stringify(msg));
//     } else {
//       console.warn("Login WebSocket is not open yet");
//     }
//   };

//   const closeSocket = () => {
//     if (socketRef.current) {
//       socketRef.current.close();
//       socketRef.current = null;
//     }
//   };

//   return { openSocket, sendMessage, closeSocket };
// };



export const useLoginSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimer = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttempts = useRef(0);

  const [isConnected, setIsConnected] = useState(false);

  const MAX_RETRIES = 5;
  const RETRY_DELAY = 3000;

  const sendMessage = useCallback((msg: any) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("⚠️ Cannot send — WebSocket not open");
    }
  }, []);

  const handleReconnectSuccess = useCallback(() => {
    console.log("✅ Reconnected to backend");
    sendMessage({ action: "Login" }); // 🔄 Re-login after reconnect
    // Optionally refetch data here if needed
  }, [sendMessage]);

  const openSocket = useCallback(async (): Promise<void> => {
    // 🧠 Prevent duplicate opens
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) return;

    const ws = await LoginWebSocket(); // ⚙️ your WebSocket init function
    if (!ws) return;

    socketRef.current = ws;

    ws.onopen = () => {
      console.log("🟢 WebSocket connected");
      const wasReconnecting = reconnectAttempts.current > 0;
      reconnectAttempts.current = 0;
      setIsConnected(true);

      if (wasReconnecting) handleReconnectSuccess();
    };

    ws.onmessage = (event) => {
      console.log("📩 Message:", event.data);
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket error:", err);
    };

    ws.onclose = () => {
      console.warn("🔴 WebSocket closed");
      setIsConnected(false);
      socketRef.current = null;

      // 🔁 Try reconnecting
      if (reconnectAttempts.current < MAX_RETRIES) {
        reconnectAttempts.current += 1;
        console.log(`🔄 Reconnecting attempt #${reconnectAttempts.current}`);
        reconnectTimer.current = setTimeout(() => {
          openSocket();
        }, RETRY_DELAY);
      } else {
        console.error("❌ Max reconnect attempts reached");
      }
    };
  }, [handleReconnectSuccess]);

  const closeSocket = useCallback(() => {
    if (reconnectTimer.current) {
      clearTimeout(reconnectTimer.current);
      reconnectTimer.current = null;
    }
    if (socketRef.current) {
      console.log("🔒 Closing WebSocket...");
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsConnected(false);
  }, []);

  return { openSocket, sendMessage, closeSocket, isConnected };
};



export const useLogoutSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);

  const openLogoutSocket = async (): Promise<void> => {
    if (socketRef.current) return;

    const ws = await LogoutWebSocket();
    if (!ws) return;

    socketRef.current = ws;

    return new Promise((resolve) => {
      ws.onopen = () => {
        console.log("Logout WebSocket connected");
        resolve();
      };
      ws.onerror = (err) => console.error("Logout WebSocket error:", err);
    });
  };

  const sendLogoutMessage = (msg: Message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("Logout WebSocket is not open yet");
    }
  };

  const closeLogoutSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  return { openLogoutSocket, sendLogoutMessage, closeLogoutSocket };
};

export const useExtendedSocket = () => {
  const socketRef = useRef<WebSocket | null>(null);

  const openExSocket = async (): Promise<void> => {
    if (socketRef.current) return;

    const ws = await ExtendedDataWebSocket();
    if (!ws) return;

    socketRef.current = ws;

    return new Promise((resolve) => {
      ws.onopen = () => {
        console.log("Extended Monitor WebSocket connected");
        resolve();
      };
      ws.onerror = (err) => console.error("Extended Monitor WebSocket error:", err);
    });
  };

  const sendExMessage = (msg: Message) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    } else {
      console.warn("Extended Monitor WebSocket is not open yet");
    }
  };

  const closeExSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  };

  return { openExSocket, sendExMessage, closeExSocket };
};
