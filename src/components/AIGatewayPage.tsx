import { Brain, Cpu, Zap, TrendingUp, Activity, AlertCircle, CheckCircle } from 'lucide-react';

export function AIGatewayPage() {
  return (
    <div className="flex-1 px-[32px] py-[24px] overflow-auto">
      <div className="max-w-[1200px]">
        <div className="mb-6">
          <h2 className="text-white text-[24px] font-bold mb-2">AI Gateway</h2>
          <p className="text-white/50 text-[14px]">Monitor and manage AI-powered test analysis</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-[12px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-green-400 text-[12px] font-semibold">Active</span>
            </div>
            <h3 className="text-white text-[28px] font-bold mb-1">GPT-4</h3>
            <p className="text-white/50 text-[14px]">Primary Model</p>
          </div>

          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-[12px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center">
                <Zap className="w-6 h-6 text-blue-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-white text-[28px] font-bold mb-1">1,243</h3>
            <p className="text-white/50 text-[14px]">Requests Today</p>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-[12px] p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-white/70 text-[12px]">98.5%</span>
            </div>
            <h3 className="text-white text-[28px] font-bold mb-1">245ms</h3>
            <p className="text-white/50 text-[14px]">Avg Response Time</p>
          </div>
        </div>

        {/* AI Analysis Settings */}
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="w-5 h-5 text-white" />
            <h3 className="text-white text-[18px] font-semibold">AI Analysis Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between bg-white/5 rounded-[8px] p-4">
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Automatic Issue Detection</p>
                <p className="text-white/50 text-[12px]">AI analyzes test failures and suggests root causes</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-green-500 relative cursor-pointer">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-[8px] p-4">
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Smart Baseline Suggestions</p>
                <p className="text-white/50 text-[12px]">Get AI recommendations for baseline image updates</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-green-500 relative cursor-pointer">
                <div className="absolute top-1 right-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-[8px] p-4">
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Test Result Summarization</p>
                <p className="text-white/50 text-[12px]">Generate natural language summaries of test runs</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-white/20 relative cursor-pointer">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/5 rounded-[8px] p-4">
              <div>
                <p className="text-white text-[14px] font-semibold mb-1">Predictive Failure Analysis</p>
                <p className="text-white/50 text-[12px]">Predict potential failures before running tests</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-white/20 relative cursor-pointer">
                <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>

        {/* Recent AI Insights */}
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Brain className="w-5 h-5 text-white" />
            <h3 className="text-white text-[18px] font-semibold">Recent AI Insights</h3>
          </div>

          <div className="space-y-3">
            {[
              {
                type: 'success',
                title: 'Pattern Detected',
                message: 'Similar failures found in ProfilePage and Settings - likely common component issue',
                time: '5 minutes ago',
              },
              {
                type: 'warning',
                title: 'Baseline Update Suggested',
                message: 'HomeScreen baseline is 30 days old and has failed 3 times - consider updating',
                time: '1 hour ago',
              },
              {
                type: 'info',
                title: 'Test Coverage Analysis',
                message: 'AI identified 3 untested user flows in your application',
                time: '2 hours ago',
              },
            ].map((insight, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-[8px] p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    insight.type === 'success' ? 'bg-green-500/20' :
                    insight.type === 'warning' ? 'bg-yellow-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {insight.type === 'success' && <CheckCircle className="w-4 h-4 text-green-500" />}
                    {insight.type === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-500" />}
                    {insight.type === 'info' && <Brain className="w-4 h-4 text-blue-500" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-white text-[14px] font-semibold">{insight.title}</h4>
                      <span className="text-white/50 text-[10px]">{insight.time}</span>
                    </div>
                    <p className="text-white/70 text-[12px]">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Stats */}
        <div className="mt-6 bg-white/5 border border-white/10 rounded-[12px] p-6">
          <h3 className="text-white text-[18px] font-semibold mb-4">API Usage</h3>
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-white/50 text-[12px] mb-1">Today</p>
              <p className="text-white text-[20px] font-bold">1,243</p>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-[12px] mb-1">This Week</p>
              <p className="text-white text-[20px] font-bold">8,547</p>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-[12px] mb-1">This Month</p>
              <p className="text-white text-[20px] font-bold">34,891</p>
            </div>
            <div className="text-center">
              <p className="text-white/50 text-[12px] mb-1">Cost</p>
              <p className="text-white text-[20px] font-bold">$127</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
