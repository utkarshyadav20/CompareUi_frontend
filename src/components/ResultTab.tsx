import { useState } from 'react';
import { Search, Grid2X2, List, ChevronDown, Eye, Download, AlertTriangle, Brain, Database, Activity } from 'lucide-react';
import { DetailedResultView } from './DetailedResultView';

interface ResultTabProps {
  buildVersion: string;
  selectedBuild: string;
  buildVersions: string[];
  onBuildChange: (build: string) => void;
  onViewTest: (testId: string) => void;
}

export function ResultTab({
  buildVersion,
  selectedBuild,
  buildVersions,
  onBuildChange,
  onViewTest,
}: ResultTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedTest, setSelectedTest] = useState<string | null>(null);
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);
  const [loadedTests, setLoadedTests] = useState(10); // Start with 10 tests

  // Mock test data
  const allTests: TestCase[] = [
    { id: '1', sNo: 1, testName: 'HomeScreen', timestamp: '12/1/2025 at 7:28 PM', status: 'PASS', mismatchPercent: '33.33%', duration: '8m 12 sec' },
    { id: '2', sNo: 2, testName: 'ProfilePage', timestamp: '12/1/2025 at 7:45 PM', status: 'PASS', mismatchPercent: '20.00%', duration: '10m 5 sec' },
    { id: '3', sNo: 3, testName: 'Settings', timestamp: '12/1/2025 at 8:00 PM', status: 'FAIL', mismatchPercent: '75.00%', duration: '5m 30 sec' },
    { id: '4', sNo: 4, testName: 'Notifications', timestamp: '12/1/2025 at 8:15 PM', status: 'FAIL', mismatchPercent: '50.00%', duration: '4m 45 sec' },
    { id: '5', sNo: 5, testName: 'Messages', timestamp: '12/1/2025 at 8:30 PM', status: 'PASS', mismatchPercent: '30.00%', duration: '3m 20 sec' },
    { id: '6', sNo: 6, testName: 'Dashboard', timestamp: '12/1/2025 at 8:45 PM', status: 'FAIL', mismatchPercent: '90.00%', duration: '2m 15 sec' },
    { id: '7', sNo: 7, testName: 'HelpCenter', timestamp: '12/1/2025 at 9:00 PM', status: 'FAIL', mismatchPercent: '65.00%', duration: '6m 5 sec' },
    { id: '8', sNo: 8, testName: 'AboutUs', timestamp: '12/1/2025 at 9:15 PM', status: 'PASS', mismatchPercent: '10.00%', duration: '8m 50 sec' },
    { id: '9', sNo: 9, testName: 'TermsOfService', timestamp: '12/1/2025 at 9:30 PM', status: 'Running', mismatchPercent: '--.---%', duration: '7m 30 sec' },
    { id: '10', sNo: 10, testName: 'PrivacyPolicy', timestamp: '12/1/2025 at 9:45 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '11', sNo: 11, testName: 'ContactUs', timestamp: '12/1/2025 at 10:00 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '12', sNo: 12, testName: 'FAQ', timestamp: '12/1/2025 at 10:15 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '13', sNo: 13, testName: 'Support', timestamp: '12/1/2025 at 10:30 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '14', sNo: 14, testName: 'Feedback', timestamp: '12/1/2025 at 10:45 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '15', sNo: 15, testName: 'RateApp', timestamp: '12/1/2025 at 11:00 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '16', sNo: 16, testName: 'UserGuide', timestamp: '12/1/2025 at 11:15 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '17', sNo: 17, testName: 'AccountSettings', timestamp: '12/1/2025 at 11:30 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '18', sNo: 18, testName: 'Security', timestamp: '12/1/2025 at 11:45 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '19', sNo: 19, testName: 'LanguageSettings', timestamp: '12/1/2025 at 11:50 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '20', sNo: 20, testName: 'Accessibility', timestamp: '12/1/2025 at 11:55 PM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '21', sNo: 21, testName: 'AppUpdates', timestamp: '12/2/2025 at 12:00 AM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '22', sNo: 22, testName: 'LogoutConfirmation', timestamp: '12/2/2025 at 12:05 AM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '23', sNo: 23, testName: 'SessionTimeout', timestamp: '12/2/2025 at 12:10 AM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '24', sNo: 24, testName: 'UserFeedback', timestamp: '12/2/2025 at 12:15 AM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
    { id: '25', sNo: 25, testName: 'VersionHistory', timestamp: '12/2/2025 at 12:20 AM', status: 'In Queue', mismatchPercent: '--.---%', duration: '--:--' },
  ];

  const filteredTests = allTests
    .filter(test => 
      test.testName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const passedTests = allTests.filter(t => t.status === 'PASS').length;
  const failedTests = allTests.filter(t => t.status === 'FAIL').length;
  const errors = 3; // Mock error count

  const handleLoadMore = () => {
    setLoadedTests(prev => Math.min(prev + 10, allTests.length));
  };

  return (
    <div className="w-full">
      {/* AI Analysis & DB Info Section */}
      <div className="px-[32px] py-[20px] space-y-4">
      </div>

      {/* Search and Controls Bar */}
      <div className="flex items-center justify-between px-[32px] py-[11px]">
        {/* Search */}
        <div className="relative w-[381px] h-[41px] rounded-[6px] border border-white/50">
          <div className="flex items-center gap-[10px] px-[20px] py-[14px] h-full">
            <Search className="w-[18px] h-[18px] text-white/50" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for result"
              className="flex-1 bg-transparent text-white text-[16px] outline-none placeholder:text-white/50"
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-[10px]">
          {/* View toggle */}
          <div className="h-[41px] rounded-[6px] border-[0.828px] border-white/50 flex items-center p-[4.554px] gap-[4px]">
            <button 
              onClick={() => setViewMode('grid')}
              className={`flex items-center justify-center p-[8.28px] rounded-[3.312px] ${viewMode === 'grid' ? 'bg-white/10' : ''}`}
            >
              <Grid2X2 className="w-[14.903px] h-[14.903px] text-white/50" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center justify-center p-[8.28px] rounded-[3.312px] ${viewMode === 'list' ? 'bg-white/10' : ''}`}
            >
              <List className="w-[14.903px] h-[14.903px] text-white/50" />
            </button>
          </div>

          {/* Build version dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsBuildDropdownOpen(!isBuildDropdownOpen)}
              className="h-[41px] border border-[rgba(107,223,149,0.3)] rounded-[4px] flex items-center gap-[10px] px-[10px] hover:bg-white/5 transition-colors"
            >
              <p className="font-mono text-[14px] text-[#6bdf95]">{selectedBuild}</p>
              <ChevronDown className="w-[14px] h-[14px] text-[#6bdf95]" />
            </button>
            {isBuildDropdownOpen && (
              <>
                <div className="fixed inset-0 z-20" onClick={() => setIsBuildDropdownOpen(false)} />
                <div className="absolute right-0 top-[45px] w-[130px] bg-[#2A2A2A] rounded-[8px] shadow-lg z-30 border border-white/10 overflow-hidden">
                  {buildVersions.map((version) => (
                    <button
                      key={version}
                      onClick={() => {
                        onBuildChange(version);
                        setIsBuildDropdownOpen(false);
                      }}
                      className={`w-full px-[16px] py-[12px] hover:bg-white/10 transition-colors text-left ${
                        version === selectedBuild ? "bg-white/5" : ""
                      }`}
                    >
                      <span className="text-white text-[14px] font-mono">
                        {version === "v1.0.234.1" ? (
                          <span className="text-[#6bdf95]">{version}</span>
                        ) : (
                          version
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Download Full Report button */}
          <button className="bg-white text-black px-[16px] py-[11.798px] rounded-[6px] flex items-center gap-[9.075px] hover:bg-white/90 transition-colors">
            <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
              <path d="M14 2v6h6"/>
              <path d="M12 18v-6"/>
              <path d="M9 15l3 3 3-3"/>
            </svg>
            <span className="font-semibold text-[14px]">Download Full Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-[32px] py-0 flex flex-wrap gap-[9px] items-end">
        {/* Total Test */}
        <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow">
          <p className="text-white text-[18px]">Total Test</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">{allTests.length}</p>
          </div>
        </div>

        {/* Test Passed */}
        <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow">
          <p className="text-white text-[18px]">Test Passed</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">{passedTests}</p>
            <div className="flex items-center gap-[2px] h-[12px]">
              <svg className="w-[10px] h-[11.215px]" fill="none" viewBox="0 0 10 12">
                <text x="5" y="10" fontSize="10" fill="#34c759" textAnchor="middle" fontFamily="Font Awesome 6 Pro"></text>
              </svg>
              <span className="text-[#34c759] text-[12px] font-medium">50.4%</span>
            </div>
          </div>
        </div>

        {/* Test Failed */}
        <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow">
          <p className="text-white text-[18px]">Test Failed</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">{failedTests}</p>
            <div className="flex items-center gap-[2px] h-[12px]">
              <svg className="w-[10px] h-[11.215px]" fill="none" viewBox="0 0 10 12">
                <text x="5" y="10" fontSize="10" fill="#ff383c" textAnchor="middle" fontFamily="Font Awesome 6 Pro"></text>
              </svg>
              <span className="text-[#ff383c] text-[12px] font-medium">93.4%</span>
            </div>
          </div>
        </div>

        {/* Errors */}
        <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow">
          <p className="text-white text-[18px]">Errors</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">{errors}</p>
            <div className="flex items-center gap-[2px] h-[12px]">
              <AlertTriangle className="w-[10px] h-[11.215px] text-[#ff383c]" />
              <span className="text-[#ff383c] text-[12px] font-medium">13.4%</span>
            </div>
          </div>
        </div>

        {/* In Review */}
        <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow opacity-20">
          <p className="text-white text-[18px]">In Review</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">145</p>
            <div className="flex items-center gap-[2px] h-[12px]">
              <span className="text-[#34c759] text-[12px] font-medium">93.4%</span>
            </div>
          </div>
        </div>

        {/* Ready for QA */}
        <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow opacity-20">
          <p className="text-white text-[18px]">Ready for QA</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">145</p>
            <div className="flex items-center gap-[2px] h-[12px]">
              <span className="text-[#34c759] text-[12px] font-medium">93.4%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Test Case Section */}
      <div className="px-[32px] py-[20px]">
        <h2 className="text-white text-[20px] font-bold mb-[12px]">Test Case</h2>

        {/* Table Header */}
        <div className="w-full bg-white/10 rounded-[6px] mb-[8px]">
          <div className="flex items-center px-[11px] py-[14px]">
            <div className="flex items-center justify-center w-[65px] shrink-0">
              <p className="text-white/70 text-[18px] font-semibold">S.no</p>
            </div>
            <div className="w-[247px] shrink-0 px-[10px]">
              <p className="text-white/70 text-[18px] font-semibold">Test Name</p>
            </div>
            <div className="w-[247px] shrink-0 px-[10px]">
              <p className="text-white/70 text-[18px] font-semibold">TimeStamp</p>
            </div>
            <div className="w-[207px] shrink-0 px-[10px]">
              <p className="text-white/70 text-[18px] font-semibold">Status</p>
            </div>
            <div className="w-[137px] shrink-0 px-[10px]">
              <p className="text-white/70 text-[18px] font-semibold">Mismatch %</p>
            </div>
            <div className="w-[219px] shrink-0 px-[10px]">
              <p className="text-white/70 text-[18px] font-semibold">Duration</p>
            </div>
            <div className="w-[125px] shrink-0 px-[10px]">
              <p className="text-white/70 text-[18px] font-semibold">Action</p>
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="space-y-[4px]">
          {filteredTests.slice(0, loadedTests).map((test) => (
            <div key={test.id} className="w-full rounded-[6px] border border-white/10 hover:bg-white/5 transition-colors">
              <div className="flex items-center px-[11px] py-[2px]">
                <div className="flex items-center justify-center w-[65px] shrink-0 p-[10px]">
                  <p className="text-white/50 text-[16px] font-bold">{String(test.sNo).padStart(2, '0')}</p>
                </div>
                <div className="w-[247px] px-[10px] shrink-0 py-[10px]">
                  <p className="text-white/50 text-[16px] font-semibold">{test.testName}</p>
                </div>
                <div className="w-[247px] shrink-0 px-[10px] py-[10px]">
                  <p className="text-white/50 text-[16px] font-mono">{test.timestamp}</p>
                </div>
                <div className="w-[207px] shrink-0 px-[10px] py-[10px]">
                  {test.status === 'PASS' && (
                    <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#00c950]" />
                      <span className="text-[#05df72] text-[16px] font-mono">PASS</span>
                    </div>
                  )}
                  {test.status === 'FAIL' && (
                    <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-red-500" />
                      <span className="text-red-500 text-[16px] font-mono">FAIL</span>
                    </div>
                  )}
                  {test.status === 'Running' && (
                    <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#3b9eff]" />
                      <span className="text-[#3b9eff] text-[16px] font-mono">Running</span>
                    </div>
                  )}
                  {test.status === 'In Queue' && (
                    <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                      <div className="w-[8px] h-[8px] rounded-full bg-[#808080]" />
                      <span className="text-[#808080] text-[16px] font-mono">In Queue</span>
                    </div>
                  )}
                </div>
                <div className="w-[137px] shrink-0 px-[10px] py-[10px]">
                  <p className="text-white/50 text-[16px] font-mono">{test.mismatchPercent}</p>
                </div>
                <div className="w-[219px] shrink-0 px-[10px] py-[10px]">
                  <p className="text-white/50 text-[16px] font-mono">{test.duration}</p>
                </div>
                <div className="w-[125px] shrink-0 px-[10px] py-0 flex items-center gap-[20px]">
                  <button 
                    onClick={() => onViewTest(test.id)}
                    className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white/10 rounded-[6px] transition-colors"
                    disabled={test.status === 'In Queue' || test.status === 'Running'}
                  >
                    <Eye className="w-[16px] h-[16px] text-white/50" />
                  </button>
                  <button className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white/10 rounded-[6px] transition-colors">
                    <Download className="w-[16px] h-[16px] text-white/50" />
                  </button>
                  {(test.status === 'FAIL') && (
                    <button className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white/10 rounded-[6px] transition-colors">
                      <AlertTriangle className="w-[16px] h-[16px] text-white/50" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {loadedTests < allTests.length && (
          <div className="flex items-center justify-center mt-[20px]">
            <button 
              onClick={handleLoadMore}
              className="bg-[#2A2A2A] text-white px-[20px] py-[10px] rounded-[6px] hover:bg-[#3A3A3A] transition-colors flex items-center gap-[8px]"
            >
              <span>Load More</span>
              <ChevronDown className="w-[16px] h-[16px]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}