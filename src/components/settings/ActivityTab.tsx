import { User, Upload, Trash2, Settings, PlayCircle, CheckCircle, XCircle, Ticket, FileCheck } from 'lucide-react';

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  type: 'upload' | 'delete' | 'test' | 'settings' | 'result' | 'approved' | 'rejected' | 'ticket';
}

export function ActivityTab() {
  const activityLogs: ActivityLog[] = [
    {
      id: '1',
      user: 'Abhijeet Punia',
      action: 'Approved test',
      target: 'HomeScreen test',
      timestamp: '2 minutes ago',
      type: 'approved',
    },
    {
      id: '2',
      user: 'Rohit Sharma',
      action: 'Raised ticket',
      target: 'Dashboard UI mismatch issue',
      timestamp: '5 minutes ago',
      type: 'ticket',
    },
    {
      id: '3',
      user: 'Priya Singh',
      action: 'Rejected test',
      target: 'Settings screen test',
      timestamp: '12 minutes ago',
      type: 'rejected',
    },
    {
      id: '4',
      user: 'Rohit Sharma',
      action: 'Uploaded baseline images',
      target: '15 images',
      timestamp: '15 minutes ago',
      type: 'upload',
    },
    {
      id: '5',
      user: 'Abhijeet Punia',
      action: 'Changed threshold',
      target: 'From 2x to 3x',
      timestamp: '1 hour ago',
      type: 'settings',
    },
    {
      id: '6',
      user: 'Priya Singh',
      action: 'Approved test',
      target: 'Profile page test',
      timestamp: '1 hour ago',
      type: 'approved',
    },
    {
      id: '7',
      user: 'Abhijeet Punia',
      action: 'Completed test run',
      target: 'Build v1.0.234.1',
      timestamp: '2 hours ago',
      type: 'result',
    },
    {
      id: '8',
      user: 'Rohit Sharma',
      action: 'Raised ticket',
      target: 'Button alignment issue in HelpCenter',
      timestamp: '2 hours ago',
      type: 'ticket',
    },
    {
      id: '9',
      user: 'Abhijeet Punia',
      action: 'Deleted baseline image',
      target: 'ProfilePage.png',
      timestamp: '3 hours ago',
      type: 'delete',
    },
    {
      id: '10',
      user: 'Priya Singh',
      action: 'Rejected test',
      target: 'Notification panel test',
      timestamp: '3 hours ago',
      type: 'rejected',
    },
    {
      id: '11',
      user: 'Rohit Sharma',
      action: 'Changed method',
      target: 'From Noise to Pixelmatch',
      timestamp: '4 hours ago',
      type: 'settings',
    },
    {
      id: '12',
      user: 'Priya Singh',
      action: 'Uploaded actual build images',
      target: '12 images from folder',
      timestamp: '5 hours ago',
      type: 'upload',
    },
    {
      id: '13',
      user: 'Abhijeet Punia',
      action: 'Approved test',
      target: 'Messages screen test',
      timestamp: '5 hours ago',
      type: 'approved',
    },
    {
      id: '14',
      user: 'Rohit Sharma',
      action: 'Raised ticket',
      target: 'Text overflow in AboutUs screen',
      timestamp: '6 hours ago',
      type: 'ticket',
    },
    {
      id: '15',
      user: 'Abhijeet Punia',
      action: 'Started comparison',
      target: 'Dashboard test',
      timestamp: '6 hours ago',
      type: 'test',
    },
  ];

  const getIcon = (type: ActivityLog['type']) => {
    switch (type) {
      case 'upload':
        return <Upload className="w-4 h-4 text-blue-400" />;
      case 'delete':
        return <Trash2 className="w-4 h-4 text-red-400" />;
      case 'test':
        return <PlayCircle className="w-4 h-4 text-purple-400" />;
      case 'settings':
        return <Settings className="w-4 h-4 text-yellow-400" />;
      case 'result':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'approved':
        return <FileCheck className="w-4 h-4 text-green-400" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'ticket':
        return <Ticket className="w-4 h-4 text-orange-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 px-[32px] py-[24px] overflow-auto">
      <div className="max-w-[1400px]">
        <div className="mb-6">
          <h2 className="text-white text-[20px] font-bold">Activity Log</h2>
        </div>

        <div className="space-y-[1px]">
          {activityLogs.map((log) => (
            <div
              key={log.id}
              className="flex items-center gap-4 px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors border-l-2 border-transparent hover:border-white/20"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5">
                {getIcon(log.type)}
              </div>

              {/* User */}
              <div className="w-[150px] shrink-0">
                <span className="text-white/70 text-[14px]">{log.user}</span>
              </div>

              {/* Action & Target */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-[14px]">
                  <span className="text-white/50">{log.action}</span>
                  <span className="text-white/30 mx-2">•</span>
                  <span className="text-white">{log.target}</span>
                </p>
              </div>

              {/* Timestamp */}
              <div className="w-[120px] shrink-0 text-right">
                <span className="text-white/40 text-[12px] font-mono">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}