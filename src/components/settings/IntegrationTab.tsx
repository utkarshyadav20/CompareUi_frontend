import { useState } from 'react';
import { Slack, Github, Calendar, MessageCircle, Link2, Key, CheckCircle, X } from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  connected: boolean;
  color: string;
}

export function IntegrationTab() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 'jira',
      name: 'Jira',
      description: 'Automatically create tickets for failed tests',
      icon: <Calendar className="w-6 h-6" />,
      connected: true,
      color: 'from-blue-600 to-blue-400',
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send test notifications to your team',
      icon: <Slack className="w-6 h-6" />,
      connected: true,
      color: 'from-purple-600 to-purple-400',
    },
    {
      id: 'github',
      name: 'GitHub',
      description: 'Link test results to commits and PRs',
      icon: <Github className="w-6 h-6" />,
      connected: false,
      color: 'from-gray-700 to-gray-500',
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Collaborate with your team on test results',
      icon: <MessageCircle className="w-6 h-6" />,
      connected: false,
      color: 'from-blue-500 to-cyan-400',
    },
  ]);

  const handleToggleIntegration = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  return (
    <div className="flex-1 px-[32px] py-[24px] overflow-auto">
      <div className="max-w-[1200px]">
        <div className="mb-6">
          <h2 className="text-white text-[24px] font-bold mb-2">Integrations</h2>
          <p className="text-white/50 text-[14px]">Connect your favorite tools and services</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {integrations.map((integration) => (
            <div
              key={integration.id}
              className="bg-white/5 border border-white/10 rounded-[12px] p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[10px] bg-gradient-to-br ${integration.color} flex items-center justify-center text-white`}>
                    {integration.icon}
                  </div>
                  <div>
                    <h3 className="text-white text-[18px] font-semibold">{integration.name}</h3>
                    <p className="text-white/50 text-[12px]">{integration.description}</p>
                  </div>
                </div>
                <div
                  className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${
                    integration.connected ? 'bg-green-500' : 'bg-white/20'
                  }`}
                  onClick={() => handleToggleIntegration(integration.id)}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      integration.connected ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </div>
              </div>

              {integration.connected && (
                <div className="bg-green-500/10 border border-green-500/30 rounded-[8px] p-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-green-500 text-[12px] font-semibold">Connected</span>
                </div>
              )}

              {!integration.connected && (
                <button
                  onClick={() => handleToggleIntegration(integration.id)}
                  className="w-full bg-white text-black px-4 py-2 rounded-[8px] font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Connect {integration.name}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* API Keys Section */}
        <div className="mt-8 bg-white/5 border border-white/10 rounded-[12px] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Key className="w-5 h-5 text-white" />
            <h3 className="text-white text-[18px] font-semibold">API Keys</h3>
          </div>

          <div className="space-y-4">
            <div className="bg-white/5 rounded-[8px] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-[14px]">Jira API Key</span>
                <span className="text-green-500 text-[12px]">Active</span>
              </div>
              <div className="bg-black/30 border border-white/10 rounded px-3 py-2 font-mono text-[12px] text-white/50">
                ••••••••••••••••••••••••••••••••
              </div>
            </div>

            <div className="bg-white/5 rounded-[8px] p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/70 text-[14px]">Slack Webhook URL</span>
                <span className="text-green-500 text-[12px]">Active</span>
              </div>
              <div className="bg-black/30 border border-white/10 rounded px-3 py-2 font-mono text-[12px] text-white/50">
                ••••••••••••••••••••••••••••••••
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
