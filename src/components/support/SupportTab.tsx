import { useState } from "react";
import {
  MessageSquare,
  Send,
  ThumbsUp,
  Bug,
  Lightbulb,
  AlertCircle,
} from "lucide-react";

interface Ticket {
  id: string;
  type: "bug" | "suggestion";
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved";
  createdAt: string;
  priority: "low" | "medium" | "high";
}

export function SupportTab() {
  const [selectedType, setSelectedType] = useState<"bug" | "suggestion">("bug");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const tickets: Ticket[] = [
    {
      id: "1",
      type: "bug",
      title: "Image comparison fails for large images",
      description: "When comparing images larger than 4K, the comparison hangs",
      status: "in-progress",
      createdAt: "2 days ago",
      priority: "high",
    },
    {
      id: "2",
      type: "suggestion",
      title: "Add bulk export for results",
      description: "Would be great to export all results at once",
      status: "open",
      createdAt: "5 days ago",
      priority: "medium",
    },
    {
      id: "3",
      type: "bug",
      title: "Baseline images not loading",
      description: "Some baseline images show broken thumbnails",
      status: "resolved",
      createdAt: "1 week ago",
      priority: "high",
    },
  ];

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) return;

    alert(
      `${selectedType === "bug" ? "Bug" : "Suggestion"} submitted successfully!`
    );
    setTitle("");
    setDescription("");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500 bg-red-500/10";
      case "medium":
        return "text-yellow-500 bg-yellow-500/10";
      case "low":
        return "text-green-500 bg-green-500/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "text-green-500 bg-green-500/10";
      case "in-progress":
        return "text-blue-500 bg-blue-500/10";
      case "open":
        return "text-muted-foreground bg-muted";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="flex-1 px-[32px] py-[24px] overflow-auto bg-background">
      <div className="max-w-[1200px]">
        <div className="mb-6">
          <h2 className="text-foreground text-[24px] font-bold mb-2">
            Support
          </h2>
          <p className="text-muted-foreground text-[14px]">
            Report bugs and submit feature suggestions
          </p>
        </div>

        <div className="grid grid-cols-[1fr_400px] gap-6">
          {/* Left - Ticket List */}
          <div className="bg-muted/40 border border-border rounded-[12px] p-6">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-5 h-5 text-foreground" />
              <h3 className="text-foreground text-[18px] font-semibold">
                Your Tickets
              </h3>
            </div>

            <div className="space-y-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-muted/40 border border-border rounded-[8px] p-4 hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {ticket.type === "bug" ? (
                        <Bug className="w-4 h-4 text-red-500" />
                      ) : (
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                      )}
                      <h4 className="text-foreground text-[14px] font-semibold">
                        {ticket.title}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-semibold uppercase ${getPriorityColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-[12px] mb-3">
                    {ticket.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-1 rounded text-[10px] font-semibold uppercase ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                    <span className="text-muted-foreground/80 text-[10px]">
                      {ticket.createdAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - New Ticket Form */}
          <div className="bg-muted/40 border border-border rounded-[12px] p-6">
            <div className="flex items-center gap-3 mb-6">
              <Send className="w-5 h-5 text-foreground" />
              <h3 className="text-foreground text-[18px] font-semibold">
                Submit New Ticket
              </h3>
            </div>

            <div className="space-y-4">
              {/* Type Selection */}
              <div>
                <label className="text-muted-foreground text-[14px] mb-2 block">
                  Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedType("bug")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] border transition-colors ${
                      selectedType === "bug"
                        ? "bg-red-500/20 border-red-500/50 text-red-500"
                        : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Bug className="w-4 h-4" />
                    <span>Bug Report</span>
                  </button>
                  <button
                    onClick={() => setSelectedType("suggestion")}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-[8px] border transition-colors ${
                      selectedType === "suggestion"
                        ? "bg-yellow-500/20 border-yellow-500/50 text-yellow-500"
                        : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    <Lightbulb className="w-4 h-4" />
                    <span>Suggestion</span>
                  </button>
                </div>
              </div>

              {/* Priority */}
              <div>
                <label className="text-muted-foreground text-[14px] mb-2 block">
                  Priority
                </label>
                <div className="flex gap-2">
                  {(["low", "medium", "high"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`flex-1 px-4 py-2 rounded-[8px] border text-[14px] capitalize transition-colors ${
                        priority === p
                          ? getPriorityColor(p) + " border-current"
                          : "bg-muted border-border text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="text-muted-foreground text-[14px] mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Brief description of the issue"
                  className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
                />
              </div>

              {/* Description */}
              <div>
                <label className="text-muted-foreground text-[14px] mb-2 block">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide detailed information..."
                  rows={6}
                  className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={!title.trim() || !description.trim()}
                className="w-full bg-foreground text-background px-4 py-3 rounded-[8px] font-semibold hover:opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
