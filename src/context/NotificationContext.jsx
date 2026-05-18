/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

const NotificationContext = createContext(null);

function generateId() {
  return crypto.randomUUID();
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id),
    );
  }, []);

  const addNotification = useCallback(
    (message, type = "info") => {
      const notification = {
        id: generateId(),
        message,
        type,
      };

      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        removeNotification(notification.id);
      }, 5000);
    },
    [removeNotification],
  );

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}

      {/* Notification UI */}
      <div className="fixed top-6 right-6 z-50 space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`min-w-[320px] rounded-2xl p-5 border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
              notification.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-300"
                : notification.type === "error"
                  ? "bg-red-500/10 border-red-500/20 text-red-300"
                  : "bg-purple-500/10 border-purple-500/20 text-purple-300"
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm leading-6">{notification.message}</p>

              <button
                onClick={() => removeNotification(notification.id)}
                className="text-white/60 hover:text-white transition"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationProvider",
    );
  }

  return context;
}
