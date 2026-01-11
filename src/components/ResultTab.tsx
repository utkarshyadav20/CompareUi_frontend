import { useState, useEffect } from 'react';
import { Search, Grid2X2, List, ChevronDown, Eye } from 'lucide-react';
import apiClient from '../api/client';

interface Result {
  id: string;
  imageName: string;
  diffPercent: number;
  resultStatus: string; // 'pass', 'fail', 'error', 'inProgress', 'On Hold'
  timestamp: string;
  heatmapUrl?: string;
  // duration is not currently in backend response, we can omit or mock it
}

interface ResultTabProps {
  projectId: string;
  buildVersion: string;
  selectedBuild: any;
  buildVersions: any[];
  onBuildChange: (build: any) => void;
  onViewTest: (testId: string) => void;
}

export function ResultTab({
  projectId,
  buildVersion,
  selectedBuild,
  buildVersions,
  onBuildChange,
  onViewTest,
}: ResultTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [isBuildDropdownOpen, setIsBuildDropdownOpen] = useState(false);
  const [loadedTests, setLoadedTests] = useState(10);
  const [tests, setTests] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      // Need a valid build ID to fetch results
      let buildId = '';
      if (typeof selectedBuild === 'string') {
        // If it's a string, maybe it's the ID? Or name? 
        // Previous code assumed it could be string. 
        // Let's assume matches logic in AndroidTVDetailFigma
        buildId = selectedBuild;
      } else if (selectedBuild && selectedBuild.buildId) {
        buildId = selectedBuild.buildId;
      }

      if (!projectId || !buildId) return;

      setLoading(true);
      try {
        const response = await apiClient.get('/result/get-results', {
          params: { projectId, buildId }
        });
        setTests(response.data.map((r: any) => ({ ...r, id: r.imageName })));
      } catch (error) {
        console.error('Failed to fetch results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [projectId, selectedBuild]);


  const filteredTests = tests.filter(test =>
    test.imageName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const passedTests = tests.filter(t => t.resultStatus === 'pass').length;
  const failedTests = tests.filter(t => t.resultStatus === 'fail').length;
  // Determining "Errors" vs "Fail" might need more status codes. For now assume Status 0 is Fail.
  const errors = 0; // Backend only sends integer status, seemingly 0 or 1.

  const handleLoadMore = () => {
    setLoadedTests(prev => Math.min(prev + 10, tests.length));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB') + ' at ' + date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="w-full">
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
              <p className="font-mono text-[14px] text-[#6bdf95]">
                {typeof selectedBuild === 'string'
                  ? selectedBuild
                  : (selectedBuild?.buildName || (selectedBuild ? `Build ${selectedBuild.buildId}` : 'Select Build'))
                }
              </p>
              <ChevronDown className="w-[14px] h-[14px] text-[#6bdf95]" />
            </button>
            {isBuildDropdownOpen && (
              <>
                <div className="fixed inset-0 z-[90]" onClick={() => setIsBuildDropdownOpen(false)} />
                <div className="absolute right-0 top-[45px] w-[130px] bg-[#1e1e1e] rounded-[8px] shadow-2xl z-[100] border border-white/20 overflow-hidden">
                  {buildVersions.length > 0 ? (
                    buildVersions.map((build) => {
                      const buildId = typeof build === 'string' ? build : build.buildId;
                      const buildName = typeof build === 'string' ? build : (build.buildName || `Build ${build.buildId}`);
                      const isSelected = typeof selectedBuild === 'string'
                        ? selectedBuild === build
                        : selectedBuild?.buildId === build.buildId;

                      return (
                        <button
                          key={buildId}
                          onClick={() => {
                            onBuildChange(build);
                            setIsBuildDropdownOpen(false);
                          }}
                          className={`w-full px-[16px] py-[12px] hover:bg-white/10 transition-colors text-left ${isSelected ? "bg-white/5" : ""
                            }`}
                        >
                          <span className="text-white text-[14px] font-mono">
                            {buildName}
                          </span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-[16px] py-[12px] text-white/50 text-[14px] font-mono">
                      No builds found
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Download Full Report button */}
          <button className="bg-white text-black px-[16px] py-[11.798px] rounded-[6px] flex items-center gap-[9.075px] hover:bg-white/90 transition-colors">
            <svg className="w-[14px] h-[14px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              <path d="M14 2v6h6" />
              <path d="M12 18v-6" />
              <path d="M9 15l3 3 3-3" />
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
            <p className="text-white text-[24px] font-bold">{tests.length}</p>
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
              {/* <span className="text-[#34c759] text-[12px] font-medium">50.4%</span> */}
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
              {/* <span className="text-[#ff383c] text-[12px] font-medium">93.4%</span> */}
            </div>
          </div>
        </div>

        {/* Errors */}
        {/* <div className="bg-[#1d1d1d] rounded-[8px] border border-white/10 px-[12px] py-[19px] flex flex-col gap-[22px] min-w-[190px] basis-0 grow">
          <p className="text-white text-[18px]">Errors</p>
          <div className="flex items-end gap-[3px]">
            <p className="text-white text-[24px] font-bold">{errors}</p>
            <div className="flex items-center gap-[2px] h-[12px]">
              <AlertTriangle className="w-[10px] h-[11.215px] text-[#ff383c]" />
              <span className="text-[#ff383c] text-[12px] font-medium">13.4%</span>
            </div>
          </div>
        </div> */}
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

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-10">
            <p className="text-white">Loading results...</p>
          </div>
        )}

        {/* Table Rows */}
        <div className="space-y-[4px]">
          {filteredTests.slice(0, loadedTests).map((test, index) => (
            <div
              key={test.id || index}
              className="w-full rounded-[6px] border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
              onClick={() => onViewTest(test.id)}
            >
              <div className="flex items-center px-[11px] py-[2px]">
                <div className="flex items-center justify-center w-[65px] shrink-0 p-[10px]">
                  <p className="text-white/50 text-[16px] font-bold">{String(index + 1).padStart(2, '0')}</p>
                </div>
                <div className="w-[247px] px-[10px] shrink-0 py-[10px]">
                  <p className="text-white/50 text-[16px] font-semibold truncate" title={test.imageName}>{test.imageName}</p>
                </div>
                <div className="w-[247px] shrink-0 px-[10px] py-[10px]">
                  <p className="text-white/50 text-[16px] font-mono">{test.timestamp ? formatDate(test.timestamp) : '--:--'}</p>
                </div>
                <div className="w-[207px] shrink-0 px-[10px] py-[10px]">
                  {(() => {
                    const status = test.resultStatus.toLowerCase();
                    if (status === 'pass') {
                      return (
                        <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                          <div className="w-[8px] h-[8px] rounded-full bg-[#00c950]" />
                          <span className="text-[#05df72] text-[16px] font-mono">PASS</span>
                        </div>
                      );
                    } else if (status === 'fail' || status === 'error') {
                      return (
                        <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                          <div className="w-[8px] h-[8px] rounded-full bg-red-500" />
                          <span className="text-red-500 text-[16px] font-mono">{status.toUpperCase()}</span>
                        </div>
                      );
                    } else if (status === 'inprogress') {
                      return (
                        <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                          <div className="w-[8px] h-[8px] rounded-full bg-yellow-500" />
                          <span className="text-yellow-500 text-[16px] font-mono">IN PROGRESS</span>
                        </div>
                      );
                    } else if (status === 'on hold') {
                      return (
                        <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                          <div className="w-[8px] h-[8px] rounded-full bg-white/50" />
                          <span className="text-white/50 text-[16px] font-mono">ON HOLD</span>
                        </div>
                      );
                    }
                    return (
                      <div className="flex items-center gap-[8px] px-[8px] py-0 rounded-[4px]">
                        <span className="text-white/50 text-[16px] font-mono">{status.toUpperCase()}</span>
                      </div>
                    );
                  })()}
                </div>
                <div className="w-[137px] shrink-0 px-[10px] py-[10px]">
                  <p className="text-white/50 text-[16px] font-mono">{test.diffPercent}%</p>
                </div>
                <div className="w-[219px] shrink-0 px-[10px] py-[10px]">
                  <p className="text-white/50 text-[16px] font-mono">--:--</p>
                </div>
                <div className="w-[125px] shrink-0 px-[10px] py-0 flex items-center gap-[20px]">
                  <button
                    onClick={() => {
                      console.log("View test clicked:", test.id);
                      onViewTest(test.id);
                    }}
                    className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white/10 rounded-[6px] transition-colors"
                  >
                    <Eye className="w-[16px] h-[16px] text-white/50" />
                  </button>
                  {/* <button className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white/10 rounded-[6px] transition-colors">
                    <Download className="w-[16px] h-[16px] text-white/50" />
                  </button> */}
                  {/* {(test.resultStatus === 0) && (
                    <button className="w-[30px] h-[30px] flex items-center justify-center hover:bg-white/10 rounded-[6px] transition-colors">
                      <AlertTriangle className="w-[16px] h-[16px] text-white/50" />
                    </button>
                  )} */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {loadedTests < tests.length && (
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