export function IntegrationPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-4xl">
        <h2 className="text-foreground text-2xl mb-6">Integrations</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slack Integration */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">#</span>
              </div>
              <div>
                <h3 className="text-foreground">Slack</h3>
                <p className="text-muted-foreground text-sm">
                  Team communication
                </p>
              </div>
            </div>
            <button className="w-full bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* GitHub Integration */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-foreground rounded-lg flex items-center justify-center">
                <span className="text-2xl text-background">G</span>
              </div>
              <div>
                <h3 className="text-foreground">GitHub</h3>
                <p className="text-muted-foreground text-sm">Code repository</p>
              </div>
            </div>
            <button className="w-full bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* Jira Integration */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">J</span>
              </div>
              <div>
                <h3 className="text-foreground">Jira</h3>
                <p className="text-muted-foreground text-sm">
                  Project management
                </p>
              </div>
            </div>
            <button className="w-full bg-foreground text-background px-4 py-2.5 rounded-lg hover:opacity-90 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* Figma Integration */}
          <div className="bg-muted/40 border border-border rounded-lg p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">F</span>
              </div>
              <div>
                <h3 className="text-foreground">Figma</h3>
                <p className="text-muted-foreground text-sm">Design tool</p>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white px-4 py-2.5 rounded-lg font-semibold">
              Connected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
