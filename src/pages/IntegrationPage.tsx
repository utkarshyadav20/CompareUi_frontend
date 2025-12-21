export function IntegrationPage() {
  return (
    <div className="px-4 md:px-8 py-8">
      <div className="max-w-4xl">
        <h2 className="text-black dark:text-white text-2xl mb-6">Integrations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Slack Integration */}
          <div className="bg-black/5 dark:bg-white/10 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">#</span>
              </div>
              <div>
                <h3 className="text-black dark:text-white">Slack</h3>
                <p className="text-black/50 dark:text-white/50 text-sm">Team communication</p>
              </div>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* GitHub Integration */}
          <div className="bg-black/5 dark:bg-white/10 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-black dark:bg-white rounded-lg flex items-center justify-center">
                <span className="text-2xl text-white dark:text-black">G</span>
              </div>
              <div>
                <h3 className="text-black dark:text-white">GitHub</h3>
                <p className="text-black/50 dark:text-white/50 text-sm">Code repository</p>
              </div>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* Jira Integration */}
          <div className="bg-black/5 dark:bg-white/10 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">J</span>
              </div>
              <div>
                <h3 className="text-black dark:text-white">Jira</h3>
                <p className="text-black/50 dark:text-white/50 text-sm">Project management</p>
              </div>
            </div>
            <button className="w-full bg-black dark:bg-white text-white dark:text-black px-4 py-2.5 rounded-lg hover:bg-black/90 dark:hover:bg-white/90 transition-colors font-semibold">
              Connect
            </button>
          </div>

          {/* Figma Integration */}
          <div className="bg-black/5 dark:bg-white/10 rounded-lg p-6 border border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">F</span>
              </div>
              <div>
                <h3 className="text-black dark:text-white">Figma</h3>
                <p className="text-black/50 dark:text-white/50 text-sm">Design tool</p>
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
