import { createContext, useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { apiUrl } from "../config/apiUrl";
import { setUnReadNotificationCount } from "../store/common/commonSlice";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const { isLogin, user, access_token } = useSelector(
    (state) => state.authReducer
  );
  const socketRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      socketRef.current = io(apiUrl, {
        transports: ["websocket"],
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        randomizationFactor: 0,
        auth: {
          token: access_token,
        },
      });
      socketRef.current.emit("join", { id: user?._id });

      socketRef.current?.on("new-notification", ({ unreadCount }) => {
        dispatch(setUnReadNotificationCount(unreadCount));
      });
    }
    return () => {
      socketRef.current?.off("new-notification");
      socketRef.current?.disconnect();
    };
  }, [isLogin, user, access_token]);

  return (
    <WebSocketContext.Provider value={socketRef}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
