import { useState } from "react";
import {
  Settings,
  Bell,
  Lock,
  Users,
  Palette,
  HelpCircle,
  Book,
  FileText,
  Video,
} from "lucide-react";

export function SettingsTab() {
  const [activeSection, setActiveSection] = useState("general");

  const sections = [
    { id: "general", label: "General", icon: <Settings className="w-4 h-4" /> },
    {
      id: "notifications",
      label: "Notifications",
      icon: <Bell className="w-4 h-4" />,
    },
    { id: "security", label: "Security", icon: <Lock className="w-4 h-4" /> },
    {
      id: "team",
      label: "Team Management",
      icon: <Users className="w-4 h-4" />,
    },
    {
      id: "appearance",
      label: "Appearance",
      icon: <Palette className="w-4 h-4" />,
    },
    { id: "howto", label: "How To Guide", icon: <Book className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      {/* Sidebar */}
      <div className="w-[280px] bg-muted/40 border-r border-border p-6 overflow-y-auto">
        <h2 className="text-foreground text-[20px] font-bold mb-6">Settings</h2>
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-[8px] transition-colors ${
                activeSection === section.id
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              {section.icon}
              <span className="text-[14px]">{section.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-[32px] py-[24px] overflow-y-auto">
        {activeSection === "general" && (
          <div>
            <h3 className="text-foreground text-[24px] font-bold mb-6">
              General Settings
            </h3>
            <div className="space-y-6">
              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <label className="text-foreground text-[14px] mb-2 block">
                  Project Name
                </label>
                <input
                  type="text"
                  defaultValue="Gray Media _ KTWX"
                  className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground outline-none focus:border-ring"
                />
              </div>

              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <label className="text-foreground text-[14px] mb-2 block">
                  Default Comparison Method
                </label>
                <select className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground outline-none focus:border-ring">
                  <option value="pixelmatch">Pixelmatch</option>
                  <option value="noise">Noise</option>
                </select>
              </div>

              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <label className="text-foreground text-[14px] mb-2 block">
                  Default Threshold
                </label>
                <select className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground outline-none focus:border-ring">
                  <option value="1x">1x</option>
                  <option value="2x">2x</option>
                  <option value="3x">3x</option>
                  <option value="4x">4x</option>
                  <option value="5x">5x</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {activeSection === "notifications" && (
          <div>
            <h3 className="text-foreground text-[24px] font-bold mb-6">
              Notification Settings
            </h3>
            <div className="space-y-4">
              {[
                {
                  label: "Test Completion",
                  description: "Get notified when tests complete",
                },
                {
                  label: "Test Failures",
                  description: "Alert me when tests fail",
                },
                {
                  label: "New Team Members",
                  description: "Notify when someone joins the team",
                },
                {
                  label: "Integration Updates",
                  description: "Updates about connected services",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-muted/40 border border-border rounded-[12px] p-6 flex items-center justify-between"
                >
                  <div>
                    <p className="text-foreground text-[16px] font-semibold mb-1">
                      {item.label}
                    </p>
                    <p className="text-muted-foreground text-[14px]">
                      {item.description}
                    </p>
                  </div>
                  <div className="w-12 h-6 rounded-full bg-green-500 relative cursor-pointer">
                    <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "security" && (
          <div>
            <h3 className="text-foreground text-[24px] font-bold mb-6">
              Security Settings
            </h3>
            <div className="space-y-6">
              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <h4 className="text-foreground text-[16px] font-semibold mb-4">
                  Change Password
                </h4>
                <div className="space-y-3">
                  <input
                    type="password"
                    placeholder="Current Password"
                    className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
                  />
                  <input
                    type="password"
                    placeholder="New Password"
                    className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New Password"
                    className="w-full bg-muted border border-border rounded-[8px] px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-ring"
                  />
                  <button className="bg-foreground text-background px-6 py-2 rounded-[8px] font-semibold hover:opacity-90 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>

              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <h4 className="text-foreground text-[16px] font-semibold mb-2">
                  Two-Factor Authentication
                </h4>
                <p className="text-muted-foreground text-[14px] mb-4">
                  Add an extra layer of security to your account
                </p>
                <button className="bg-muted border border-border text-foreground px-6 py-2 rounded-[8px] hover:bg-muted/80 transition-colors">
                  Enable 2FA
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSection === "team" && (
          <div>
            <h3 className="text-foreground text-[24px] font-bold mb-6">
              Team Management
            </h3>
            <div className="bg-muted/40 border border-border rounded-[12px] p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-foreground text-[18px] font-semibold">
                  Team Members
                </h4>
                <button className="bg-foreground text-background px-4 py-2 rounded-[8px] font-semibold hover:opacity-90 transition-colors">
                  Invite Member
                </button>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Abhijeet Punia",
                    email: "abhijeet@example.com",
                    role: "Admin",
                    avatar: "AP",
                  },
                  {
                    name: "Rohit Sharma",
                    email: "rohit@example.com",
                    role: "Member",
                    avatar: "RS",
                  },
                  {
                    name: "Priya Singh",
                    email: "priya@example.com",
                    role: "Member",
                    avatar: "PS",
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-[8px] p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-[14px] font-semibold">
                        {member.avatar}
                      </div>
                      <div>
                        <p className="text-foreground text-[14px] font-semibold">
                          {member.name}
                        </p>
                        <p className="text-muted-foreground text-[12px]">
                          {member.email}
                        </p>
                      </div>
                    </div>
                    <span className="text-muted-foreground text-[14px]">
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "appearance" && (
          <div>
            <h3 className="text-foreground text-[24px] font-bold mb-6">
              Appearance Settings
            </h3>
            <div className="space-y-6">
              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <h4 className="text-foreground text-[16px] font-semibold mb-4">
                  Theme
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {["Light", "Dark", "Auto"].map((theme) => (
                    <div
                      key={theme}
                      className={`bg-muted border rounded-[8px] p-4 text-center cursor-pointer hover:bg-muted/80 transition-colors ${
                        theme === "Dark" ? "border-foreground" : "border-border"
                      }`}
                    >
                      <p className="text-foreground text-[14px]">{theme}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/40 border border-border rounded-[12px] p-6">
                <h4 className="text-foreground text-[16px] font-semibold mb-4">
                  Accent Color
                </h4>
                <div className="grid grid-cols-6 gap-3">
                  {[
                    "#6366f1",
                    "#8b5cf6",
                    "#ec4899",
                    "#f43f5e",
                    "#f59e0b",
                    "#10b981",
                  ].map((color) => (
                    <div
                      key={color}
                      className="w-12 h-12 rounded-full cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "howto" && (
          <div>
            <h3 className="text-foreground text-[24px] font-bold mb-6">
              How To Guide
            </h3>
            <div className="space-y-4">
              {[
                {
                  title: "Getting Started with Image Testing",
                  description: "Learn the basics of visual regression testing",
                  icon: <Book className="w-5 h-5" />,
                  type: "article",
                },
                {
                  title: "Setting Up Baseline Images",
                  description: "Step-by-step guide to create baseline images",
                  icon: <FileText className="w-5 h-5" />,
                  type: "article",
                },
                {
                  title: "Understanding Comparison Methods",
                  description: "Pixelmatch vs Noise - Which to use?",
                  icon: <HelpCircle className="w-5 h-5" />,
                  type: "article",
                },
                {
                  title: "Video Tutorial: Complete Workflow",
                  description:
                    "Watch a complete walkthrough of the testing process",
                  icon: <Video className="w-5 h-5" />,
                  type: "video",
                },
              ].map((guide, index) => (
                <div
                  key={index}
                  className="bg-muted/40 border border-border rounded-[12px] p-6 hover:bg-muted/60 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-[10px] bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                      {guide.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-foreground text-[16px] font-semibold mb-1">
                        {guide.title}
                      </h4>
                      <p className="text-muted-foreground text-[14px]">
                        {guide.description}
                      </p>
                      <span className="inline-block mt-2 px-2 py-1 bg-muted rounded text-muted-foreground text-[12px]">
                        {guide.type}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
