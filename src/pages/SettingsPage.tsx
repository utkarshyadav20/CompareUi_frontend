import { ArrowRight } from "lucide-react";

interface SettingsPageProps {
  projectName: string;
  projectType: string;
}

export function SettingsPage({ projectName, projectType }: SettingsPageProps) {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-4xl">
        <h2 className="text-foreground text-2xl mb-6">Settings</h2>

        <div className="space-y-6">
          {/* Project Settings */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg mb-4">Project Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-foreground block mb-2">
                  Project Name
                </label>
                <input
                  type="text"
                  value={projectName}
                  className="w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-ring"
                  readOnly
                />
              </div>
              <div>
                <label className="text-foreground block mb-2">
                  Project Type
                </label>
                <input
                  type="text"
                  value={projectType}
                  className="w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-ring"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Comparison Settings */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <h3 className="text-foreground text-lg mb-4">
              Comparison Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-foreground block mb-2">
                  Default Method
                </label>
                <select className="w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-ring">
                  <option>Noise</option>
                  <option>Pixelmatch</option>
                </select>
              </div>
              <div>
                <label className="text-foreground block mb-2">
                  Default Threshold
                </label>
                <select className="w-full bg-input border border-input rounded-lg px-4 py-3 text-foreground outline-none focus:border-ring">
                  <option>1x</option>
                  <option>2x</option>
                  <option>3x</option>
                  <option>4x</option>
                  <option>5x</option>
                </select>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/30">
            <h3 className="text-red-500 text-lg mb-4">Danger Zone</h3>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg transition-colors">
              Delete Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
