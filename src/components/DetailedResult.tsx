import { useState } from 'react';
import { ChevronLeft, Bell, ChevronDown, Check, X as XIcon, Download, AlertTriangle } from 'lucide-react';
import imgFrame21 from "figma:asset/4162ceeb80530f8f205313a378469f2d23a67359.png";

interface Issue {
  id: string;
  severity: 'Major' | 'Medium' | 'Low';
  title: string;
  description: string;
  coordinates: string;
}

interface DetailedResultProps {
  testId: string;
  testName: string;
  onBack: () => void;
  buildVersion: string;
}

export function DetailedResult({ testId, testName, onBack, buildVersion = 'v12.224' }: DetailedResultProps) {
  const [activeTab, setActiveTab] = useState<'baseline' | 'live' | 'difference'>('baseline');
  const [isDownloading, setIsDownloading] = useState(false);
  const [finalVerdict, setFinalVerdict] = useState<'approve' | 'reject' | null>(null);

  // Mock data for the detailed result
  const testStatus = 'FAILED';
  const differentPercentage = 80.24;
  const detectedIssues = 6;

  const baselineImageUrl = 'https://images.unsplash.com/photo-1574267432644-f74bc7c02d60?w=800&h=450&fit=crop';
  const liveImageUrl = 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=800&h=450&fit=crop';
  const differenceImageUrl = 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop';

  const issues: Issue[] = [
    {
      id: '1',
      severity: 'Major',
      title: 'Significant color mismatch detected',
      description: 'Significant color mismatch detected',
      coordinates: 'x: 0, y: 0 • 100×100'
    },
    {
      id: '2',
      severity: 'Major',
      title: 'Padding is not as per Figma baseline image',
      description: 'Padding is not as per Figma baseline image',
      coordinates: 'x: 10, y: 15 • 75×75'
    },
    {
      id: '3',
      severity: 'Major',
      title: 'Text is not matching',
      description: 'Text is not matching',
      coordinates: 'x: 20, y: 20 • 50×50'
    },
    {
      id: '4',
      severity: 'Medium',
      title: 'Color scheme applied incorrectly',
      description: 'Color scheme applied incorrectly',
      coordinates: 'x: 30, y: 35 • 150×150'
    },
    {
      id: '5',
      severity: 'Major',
      title: 'Color scheme applied incorrectly',
      description: 'Color scheme applied incorrectly',
      coordinates: 'x: 40, y: 45 • 200×200'
    },
    {
      id: '6',
      severity: 'Low',
      title: 'Minor alignment issue',
      description: 'Minor alignment issue',
      coordinates: 'x: 50, y: 55 • 100×100'
    }
  ];

  const severityCounts = {
    Major: issues.filter(i => i.severity === 'Major').length,
    Medium: issues.filter(i => i.severity === 'Medium').length,
    Low: issues.filter(i => i.severity === 'Low').length
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    // Simulate PDF generation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would use jspdf or a similar library
    // For now, we'll create a simple alert
    alert('PDF report would be downloaded here. In production, this would use jspdf to generate a comprehensive PDF with all test details, images, and issues.');
    
    setIsDownloading(false);
  };

  const handleRaiseIssue = () => {
    // This will trigger Jira integration
    alert('This would open a Jira integration dialog. In production, this would connect to your Jira instance and create a new issue with all test details.');
  };

  const handleApprove = () => {
    setFinalVerdict('approve');
    alert('Test result approved. This action is final and cannot be changed.');
  };

  const handleReject = () => {
    setFinalVerdict('reject');
    alert('Test result rejected. This action is final and cannot be changed.');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="w-full border-b border-white/10">
        <div className="flex items-center justify-between px-[32px] py-[16px]">
          {/* Left side - Back button and title */}
          <div className="flex items-center gap-[20px]">
            <button 
              onClick={onBack}
              className="text-white/50 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-[22px] h-[22px]" />
            </button>
            <h1 className="text-white text-[20px] font-bold">Detailed Result</h1>
          </div>

          {/* Right side - Notification and Profile */}
          <div className="flex items-center gap-[18px]">
            <button className="bg-white/10 border border-white/10 rounded-full w-[46px] h-[46px] flex items-center justify-center hover:bg-white/20 transition-colors">
              <Bell className="w-[18px] h-[18px] text-white" />
            </button>

            <div className="flex items-center gap-[7px]">
              <div className="flex flex-col items-end">
                <p className="font-bold text-[16px] text-white">Abhijeet Punia</p>
                <p className="text-[10px] text-white/50">Qucikplay</p>
              </div>
              <div className="rounded-full size-[47px] overflow-hidden">
                <img src={imgFrame21} alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Screen Info Bar */}
      <div className="w-full border-b border-white/10">
        <div className="flex items-center justify-between px-[32px] py-[16px]">
          <div>
            <p className="text-white/50 text-[12px] mb-[4px]">ScreenName:</p>
            <p className="text-white text-[20px] font-semibold">{testName}</p>
          </div>

          <div className="flex items-center gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <span className="text-white/50 text-[14px]">Status:</span>
              <div className="bg-red-500/20 px-[12px] py-[6px] rounded-[4px] flex items-center gap-[6px]">
                <span className="text-red-500 text-[14px] font-semibold">● {testStatus}</span>
              </div>
            </div>

            {/* Build version dropdown */}
            <div className="h-[41px] border border-[rgba(107,223,149,0.3)] rounded-[4px] flex items-center gap-[10px] px-[12px]">
              <p className="font-mono text-[14px] text-[#6bdf95]">{buildVersion}</p>
              <ChevronDown className="w-[14px] h-[14px] text-[#6bdf95]" />
            </div>

            <button 
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="bg-white text-black px-[16px] py-[10px] rounded-[6px] flex items-center gap-[8px] hover:bg-white/90 transition-colors disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="w-[14px] h-[14px] border-2 border-black/20 border-t-black rounded-full animate-spin" />
                  <span className="font-semibold text-[14px]">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-[14px] h-[14px]" />
                  <span className="font-semibold text-[14px]">Download Report</span>
                </>
              )}
            </button>

            <button 
              onClick={handleRaiseIssue}
              className="bg-white text-black px-[16px] py-[10px] rounded-[6px] font-semibold text-[14px] hover:bg-white/90 transition-colors"
            >
              Raise Issue
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-[24px] px-[32px] py-[24px]">
        {/* Left Panel - Image Viewer */}
        <div className="bg-[#1A1A1A] rounded-[12px] border border-white/10 overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-white/10">
            <button
              onClick={() => setActiveTab('baseline')}
              className={`flex-1 px-[20px] py-[14px] text-[14px] font-semibold transition-colors ${
                activeTab === 'baseline' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              Baseline Image
            </button>
            <button
              onClick={() => setActiveTab('live')}
              className={`flex-1 px-[20px] py-[14px] text-[14px] font-semibold transition-colors ${
                activeTab === 'live' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              Live image
            </button>
            <button
              onClick={() => setActiveTab('difference')}
              className={`flex-1 px-[20px] py-[14px] text-[14px] font-semibold transition-colors ${
                activeTab === 'difference' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/70'
              }`}
            >
              Image Difference
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center justify-between px-[20px] py-[12px] border-b border-white/10">
            <div className="flex items-center gap-[8px]">
              <button className="w-[32px] h-[32px] bg-white/10 rounded-[4px] flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-white text-[18px]">−</span>
              </button>
              <span className="text-white text-[14px] font-mono min-w-[60px] text-center">100</span>
              <button className="w-[32px] h-[32px] bg-white/10 rounded-[4px] flex items-center justify-center hover:bg-white/20 transition-colors">
                <span className="text-white text-[18px]">+</span>
              </button>
            </div>
          </div>

          {/* Image Display */}
          <div className="p-[20px] bg-[#0A0A0A] min-h-[500px] flex items-center justify-center">
            <div className="relative w-full max-w-[600px]">
              {activeTab === 'baseline' && (
                <img 
                  src={baselineImageUrl} 
                  alt="Baseline" 
                  className="w-full h-auto rounded-[8px] border border-white/10"
                />
              )}
              {activeTab === 'live' && (
                <img 
                  src={liveImageUrl} 
                  alt="Live" 
                  className="w-full h-auto rounded-[8px] border border-white/10"
                />
              )}
              {activeTab === 'difference' && (
                <img 
                  src={differenceImageUrl} 
                  alt="Difference" 
                  className="w-full h-auto rounded-[8px] border border-white/10"
                />
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Issue Details */}
        <div className="flex flex-col gap-[24px]">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-[12px]">
            {/* Different Percentage */}
            <div className="bg-[#1A1A1A] rounded-[12px] border border-white/10 p-[20px]">
              <p className="text-white/70 text-[14px] mb-[8px]">Different Percentage</p>
              <p className="text-white text-[32px] font-bold">{differentPercentage}%</p>
            </div>

            {/* Detected Issues */}
            <div className="bg-[#1A1A1A] rounded-[12px] border border-white/10 p-[20px]">
              <p className="text-white/70 text-[14px] mb-[8px]">Detected Issues</p>
              <p className="text-white text-[32px] font-bold">{detectedIssues}</p>
            </div>
          </div>

          {/* Final Verdict */}
          <div className="bg-[#1A1A1A] rounded-[12px] border border-white/10 p-[20px]">
            <p className="text-white text-[16px] font-semibold mb-[12px]">Final Verdict</p>
            <div className="flex items-center gap-[12px]">
              <button
                onClick={handleApprove}
                disabled={finalVerdict !== null}
                className={`flex-1 px-[20px] py-[12px] rounded-[6px] flex items-center justify-center gap-[8px] transition-colors ${
                  finalVerdict === 'approve' 
                    ? 'bg-green-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <Check className="w-[18px] h-[18px]" />
                <span className="font-semibold">Approve</span>
              </button>
              <button
                onClick={handleReject}
                disabled={finalVerdict !== null}
                className={`flex-1 px-[20px] py-[12px] rounded-[6px] flex items-center justify-center gap-[8px] transition-colors ${
                  finalVerdict === 'reject' 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <XIcon className="w-[18px] h-[18px]" />
                <span className="font-semibold">Reject</span>
              </button>
            </div>
            {finalVerdict && (
              <p className="text-white/50 text-[12px] mt-[12px] italic">
                This action is final. Once submitted, the verdict cannot be changed.
              </p>
            )}
          </div>

          {/* Issue Overview */}
          <div className="bg-[#1A1A1A] rounded-[12px] border border-white/10 p-[20px] flex-1">
            <p className="text-white text-[16px] font-semibold mb-[8px]">Issue Overview</p>
            <p className="text-white/50 text-[12px] mb-[16px]">
              When the user is traveling, an error pop-up should appear with the message "Are you traveling?" 
              instead of that, we are getting "Oops! Something went wrong." message in the current UI
            </p>

            {/* Severity Summary */}
            <div className="grid grid-cols-3 gap-[8px] mb-[16px]">
              <div className="bg-red-500/10 border border-red-500/30 rounded-[6px] p-[12px]">
                <p className="text-red-400 text-[12px] mb-[4px]">Major</p>
                <p className="text-red-400 text-[24px] font-bold">{severityCounts.Major}</p>
              </div>
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-[6px] p-[12px]">
                <p className="text-yellow-400 text-[12px] mb-[4px]">Medium</p>
                <p className="text-yellow-400 text-[24px] font-bold">{severityCounts.Medium}</p>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-[6px] p-[12px]">
                <p className="text-blue-400 text-[12px] mb-[4px]">Low</p>
                <p className="text-blue-400 text-[24px] font-bold">{severityCounts.Low}</p>
              </div>
            </div>

            {/* Issue List */}
            <div className="space-y-[8px] max-h-[400px] overflow-y-auto">
              {issues.map((issue) => (
                <div
                  key={issue.id}
                  className={`rounded-[6px] p-[12px] border ${
                    issue.severity === 'Major'
                      ? 'bg-red-500/10 border-red-500/30'
                      : issue.severity === 'Medium'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-blue-500/10 border-blue-500/30'
                  }`}
                >
                  <div className="flex items-start gap-[8px] mb-[4px]">
                    <AlertTriangle
                      className={`w-[16px] h-[16px] mt-[2px] ${
                        issue.severity === 'Major'
                          ? 'text-red-400'
                          : issue.severity === 'Medium'
                          ? 'text-yellow-400'
                          : 'text-blue-400'
                      }`}
                    />
                    <div className="flex-1">
                      <p
                        className={`text-[14px] font-semibold ${
                          issue.severity === 'Major'
                            ? 'text-red-400'
                            : issue.severity === 'Medium'
                            ? 'text-yellow-400'
                            : 'text-blue-400'
                        }`}
                      >
                        {issue.severity}
                      </p>
                      <p className="text-white text-[13px] mt-[4px]">{issue.description}</p>
                      <p className="text-white/50 text-[11px] font-mono mt-[4px]">{issue.coordinates}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
