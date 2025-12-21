import { useState } from "react";
import { Search, Bell, Settings, AlertTriangle, ArchiveX } from "lucide-react";

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const [activeTab, setActiveTab] = useState<"inbox" | "archive" | "comments">(
    "inbox"
  );
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      message:
        "compare-backend-6ws8 failed to deploy in the Production environment",
      timestamp: "1d ago",
      isRead: false,
    },
    {
      id: "2",
      message:
        "compare-backend-6ws8 failed to deploy in the Production environment",
      timestamp: "2d ago",
      isRead: true,
    },
    {
      id: "3",
      message:
        "compare-backend-6ws8 failed to deploy in the Production environment",
      timestamp: "2d ago",
      isRead: true,
    },
    {
      id: "4",
      message:
        "compare-backend-6ws8 failed to deploy in the Production environment",
      timestamp: "2d ago",
      isRead: true,
    },
    {
      id: "5",
      message:
        "compare-backend-6ws8 failed to deploy in the Production environment",
      timestamp: "2d ago",
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleArchiveAll = () => {
    setNotifications([]);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-4 top-16 w-[520px] h-[600px] bg-popover border border-border rounded-lg shadow-2xl overflow-hidden z-50 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Find..."
              className="w-full bg-muted border border-border rounded-md pl-9 pr-12 py-2 text-foreground text-sm placeholder:text-muted-foreground outline-none focus:border-ring"
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-background text-muted-foreground text-xs rounded border border-border">
              F
            </kbd>
          </div>
          <button className="px-4 py-2 bg-muted hover:bg-accent text-foreground rounded-md text-sm transition-colors">
            Feedback
          </button>
          <button className="relative p-2 bg-muted hover:bg-accent rounded-md transition-colors">
            <Bell className="w-4 h-4 text-foreground" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[10px] text-primary-foreground font-semibold">
                {unreadCount}
              </div>
            )}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-between px-4 py-2 border-b border-border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setActiveTab("inbox")}
              className={`px-3 py-1 text-sm transition-colors ${
                activeTab === "inbox"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Inbox{" "}
              {unreadCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 bg-muted rounded text-xs">
                  {unreadCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("archive")}
              className={`px-3 py-1 text-sm transition-colors ${
                activeTab === "archive"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Archive
            </button>
            <button
              onClick={() => setActiveTab("comments")}
              className={`px-3 py-1 text-sm transition-colors ${
                activeTab === "comments"
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Comments
            </button>
          </div>
          <button className="p-1.5 hover:bg-accent rounded transition-colors">
            <Settings className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
              No notifications
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="group px-4 py-3 border-b border-border hover:bg-accent transition-colors cursor-pointer flex items-start gap-3"
              >
                <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground text-sm leading-relaxed">
                    <span className="font-semibold">compare-backend-6ws8</span>{" "}
                    failed to deploy in the{" "}
                    <span className="font-semibold">Production</span>{" "}
                    environment
                  </p>
                  <p className="text-muted-foreground text-xs mt-1">
                    {notification.timestamp}
                  </p>
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!notification.isRead && (
                    <div className="w-2 h-2 bg-primary rounded-full shrink-0" />
                  )}
                  <button className="p-1 hover:bg-muted/50 rounded transition-colors">
                    <ArchiveX className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-border">
            <button
              onClick={handleArchiveAll}
              className="w-full py-2.5 bg-muted hover:bg-accent text-foreground rounded-md text-sm transition-colors"
            >
              Archive All
            </button>
          </div>
        )}
      </div>
    </>
  );
}
