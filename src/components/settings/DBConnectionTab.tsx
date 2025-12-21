import { Database, Activity, CheckCircle, AlertCircle, Zap } from 'lucide-react';

export function DBConnectionTab() {
  return (
    <div className="flex-1 px-[32px] py-[24px] overflow-auto">
      <div className="max-w-[1200px]">
        <div className="mb-6">
          <h2 className="text-white text-[24px] font-bold mb-2">Database Connection</h2>
          <p className="text-white/50 text-[14px]">Monitor your database connection status and usage</p>
        </div>

        {/* Connection Status */}
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-white text-[18px] font-semibold">Connected</h3>
                <p className="text-white/50 text-[14px]">Database is operational</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/50 text-[12px]">Last checked</p>
              <p className="text-white text-[14px]">2 minutes ago</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-[8px] p-4">
              <p className="text-white/50 text-[12px] mb-1">Host</p>
              <p className="text-white text-[14px] font-mono">db.example.com</p>
            </div>
            <div className="bg-white/5 rounded-[8px] p-4">
              <p className="text-white/50 text-[12px] mb-1">Database</p>
              <p className="text-white text-[14px] font-mono">testautomation_db</p>
            </div>
            <div className="bg-white/5 rounded-[8px] p-4">
              <p className="text-white/50 text-[12px] mb-1">Port</p>
              <p className="text-white text-[14px] font-mono">5432</p>
            </div>
          </div>
        </div>

        {/* Database Usage */}
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-5 h-5 text-white" />
            <h3 className="text-white text-[18px] font-semibold">Database Usage</h3>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="flex items-end justify-between mb-2">
                <p className="text-white/70 text-[14px]">Storage Used</p>
                <p className="text-white text-[20px] font-bold">2.4 GB</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[48%]" />
              </div>
              <p className="text-white/50 text-[12px] mt-1">48% of 5 GB</p>
            </div>

            <div>
              <div className="flex items-end justify-between mb-2">
                <p className="text-white/70 text-[14px]">Active Connections</p>
                <p className="text-white text-[20px] font-bold">8</p>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-[40%]" />
              </div>
              <p className="text-white/50 text-[12px] mt-1">8 of 20 max connections</p>
            </div>
          </div>
        </div>

        {/* Recent Queries */}
        <div className="bg-white/5 border border-white/10 rounded-[12px] p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-5 h-5 text-white" />
            <h3 className="text-white text-[18px] font-semibold">Recent Queries</h3>
          </div>

          <div className="space-y-3">
            {[
              { query: 'SELECT * FROM test_results WHERE build_id = ?', time: '2ms', status: 'success' },
              { query: 'INSERT INTO baseline_images VALUES (?, ?, ?)', time: '5ms', status: 'success' },
              { query: 'UPDATE project_settings SET threshold = ?', time: '3ms', status: 'success' },
              { query: 'SELECT * FROM activity_logs ORDER BY timestamp DESC', time: '4ms', status: 'success' },
            ].map((item, index) => (
              <div key={index} className="bg-white/5 rounded-[8px] p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-white/70 text-[14px] font-mono">{item.query}</p>
                </div>
                <div className="flex items-center gap-4 ml-4">
                  <span className="text-white/50 text-[12px]">{item.time}</span>
                  {item.status === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
