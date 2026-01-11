import React from 'react';

interface Box {
    x: number;
    y: number;
    id: string;
    width: number;
    height: number;
    density: number;
    severity: string;
    pixelCount: number;
}

interface ResultData {
    projectId: string;
    buildId: string;
    screenName: string;
    resultStatus: string;
    diffPercent: number;
    diffImageUrl: string;
    coordinates: {
        boxes: Box[];
        counts: {
            Low: number;
            Major: number;
            Medium: number;
        };
        dimensions: {
            width: number;
            height: number;
        };
    };
    baselineImageUrl: string;
    actualImageUrl: string;
    createdAt: string;
}

interface IssueData {
    id: string;
    projectId: string;
    imageName: string;
    buildId: string;
    projectType: string;
    coordsVsText: {
        id: string;
        type: string;
        description: string;
    }[];
}

interface ReportDocumentProps {
    result: ResultData;
    modelResult: IssueData;
    projectName?: string; // e.g. "Gray Media"
    appName?: string;    // e.g. "KTWX"
    deviceType?: string; // e.g. "Android TV" - mapped from projectType if not passed
    buildName?: string;  // e.g. "v12.224"
}

export const ReportDocument: React.FC<ReportDocumentProps> = ({
    result,
    modelResult,
    projectName = "Gray Media",
    appName = "KTWX",
    deviceType = "Android TV",
    buildName
}) => {

    // Helper to format date
    const formattedDate = new Date(result.createdAt).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }) + " IST";

    // Join issues with boxes to get severity
    const issues = modelResult.coordsVsText.map(issue => {
        const box = result.coordinates.boxes.find(b => b.id === issue.id);
        return {
            ...issue,
            severity: box?.severity || 'Low' // Default to Low if not found
        };
    });

    // Calculate scaling for boxes if displayed image is smaller than original dimensions
    // For the report, we might want to display images at a specific width (e.g. 100% of column)
    // But the boxes are in original coordinates.
    // We can use a % based approach or assume the image is rendered at full width reference.
    // However, simple HTML/CSS matching usually needs a wrapper with `position: relative` and correct aspect ratio.
    const { width: originalWidth, height: originalHeight } = result.coordinates.dimensions;

    // We will assume the image fills the container width in the report, so we use percentage coordinates for boxes.
    const getBoxStyle = (box: Box) => ({
        left: `${(box.x / originalWidth) * 100}%`,
        top: `${(box.y / originalHeight) * 100}%`,
        width: `${(box.width / originalWidth) * 100}%`,
        height: `${(box.height / originalHeight) * 100}%`,
    });

    return (
        <div id="report-container" className="report-page">
            <style>{`
        /* Embedded CSS from ReportFormat.html adapted for React/Scoped */
        .report-page {
           --bg: #FFFFFF;
          --card: #FBFBFB;
          --border: #E5E7EB;
          --text: #1F2937;
          --muted: #6B7280;
          --fail: #FF0000;
          --fail-bg: rgba(255, 0, 0, 0.14);
          --blue: #2563EB;
          --major: #FF0000;
          --medium: #2F2FE6;
          --low: #D08700;
          
          /* RESET GLOBALS TO PREVENT OKLCH ERRORS IN HTML2CANVAS */
          --ring: #000000;
          --background: #FFFFFF;
          --foreground: #1F2937;
          --border: #E5E7EB;
          --muted: #6B7280;
          --popover: #FFFFFF;
          --card: #FBFBFB;

          max-width: 960px;
          margin: auto;
          display: flex;
          flex-direction: column;
          gap: 24px;
          font-family: 'Poppins', sans-serif;
          color: var(--text);
          background: var(--bg);
          padding: 32px;
        }
        
        /* Force reset of problematic global styles */
        .report-page * {
           outline: none !important;
           box-shadow: none !important; 
        }

        .report-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .report-header-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .report-title {
          font-size: 22px;
          font-weight: 600;
        }

        .report-subtitle {
          font-size: 13px;
          color: var(--muted);
        }

        .report-status {
          padding: 4px 8px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.65px;
          color: var(--fail);
          background: var(--fail-bg);
          text-transform: uppercase;
        }

        .report-card {
          background: var(--card);
          border: 1px solid var(--border);
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .report-card-title {
          font-size: 15px;
          font-weight: 500;
        }

        .report-meta-grid {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }

        .report-meta-col {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .report-meta-label {
          font-size: 11px;
          color: var(--muted);
        }

        .report-meta-value {
          font-size: 13px;
        }

        .report-meta-value.bold {
          font-weight: 700;
        }

        .report-meta-value.fail {
          color: var(--fail);
          font-weight: 700;
          text-transform: uppercase;
        }

        .report-issue-box {
          padding: 10px;
          font-size: 13px;
        }

        .report-visual-header {
          display: flex;
          justify-content: space-between;
          font-size: 11px;
          color: #3B4450;
        }

        .report-visual-row {
          display: flex;
          gap: 16px;
          justify-content: space-between;
        }

        .report-image-col {
          width: 50%;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: center;
        }

        .report-image-frame {
          width: 100%;
          border: 1px solid rgba(0,0,0,0.1);
          position: relative;
          aspect-ratio: ${originalWidth} / ${originalHeight};
        }

        .report-image-frame img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: contain;
        }

        .report-bounding-box {
           position: absolute;
           border: 2px solid;
           background-color: transparent;
           z-index: 10;
        }

        .severity-Major { border-color: var(--major); }
        .severity-Medium { border-color: var(--medium); }
        .severity-Low { border-color: var(--low); }


        .report-image-link {
          font-size: 11px;
          color: var(--blue);
          text-decoration: underline;
          text-align: center;
        }

        .report-legend {
          display: flex;
          gap: 20px;
          align-items: center;
        }

        .report-legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
        }

        .report-legend-color {
          width: 22px;
          height: 10px;
        }

        .report-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }

        .report-table th, .report-table td {
          padding: 10px;
          border-bottom: 1px solid var(--border);
          text-align: left;
        }

        .report-table th {
          font-weight: 500;
          color: var(--muted);
        }

        .report-table th:first-child,
        .report-table td:first-child {
          width: 90px;
          white-space: nowrap;
        }

        .report-footer {
          text-align: center;
          font-size: 11px;
          color: var(--muted);
        }
      /* Status Colors - REVERTED */
      /* Pagination - REVERTED */
    `}</style>

            {/* Header */}
            <div className="report-header">
                <div className="report-header-left">
                    <div className="report-title">UI Image Comparison Report</div>
                    <div className="report-subtitle">
                        {projectName} · {appName || 'No App Name'} · {modelResult.projectType || deviceType} · {result.screenName}
                    </div>
                </div>
                <div className="report-status">
                    {result.resultStatus}
                </div>
            </div>

            {/* Project Info */}
            <div className="report-card">
                <div className="report-card-title">Project Information</div>
                <div className="report-meta-grid">
                    <div className="report-meta-col">
                        <div>
                            <div className="report-meta-label">Project Name</div>
                            <div className="report-meta-value">{projectName}</div>
                        </div>
                        <div>
                            <div className="report-meta-label">Application Name</div>
                            <div className="report-meta-value">{appName}</div>
                        </div>
                        <div>
                            <div className="report-meta-label">Timestamp</div>
                            <div className="report-meta-value">{formattedDate}</div>
                        </div>
                    </div>

                    <div className="report-meta-col">
                        <div>
                            <div className="report-meta-label">Screen Name</div>
                            <div className="report-meta-value">{result.screenName}</div>
                        </div>
                        <div>
                            <div className="report-meta-label">Device</div>
                            <div className="report-meta-value">{modelResult.projectType || deviceType}</div>
                        </div>
                        <div>
                            <div className="report-meta-label">Build</div>
                            <div className="report-meta-value">{buildName || result.buildId}</div>
                        </div>
                    </div>

                    <div className="report-meta-col">
                        <div>
                            <div className="report-meta-label">Environment</div>
                            <div className="report-meta-value">Stage</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Result Summary */}
            <div className="report-card">
                <div className="report-card-title">Result Summary</div>
                <div className="report-meta-grid">
                    <div>
                        <div className="report-meta-label">Difference Percentage</div>
                        <div className="report-meta-value bold">{result.diffPercent}%</div>
                    </div>
                    <div>
                        <div className="report-meta-label">Test Status</div>
                        <div className="report-meta-value fail">{result.resultStatus}</div>
                    </div>
                    <div>
                        <div className="report-meta-label">Total Issues Detected</div>
                        <div className="report-meta-value bold">{result.coordinates.boxes.length}</div>
                    </div>
                    <div>
                        <div className="report-meta-label">Generated By / Tester</div>
                        <div className="report-meta-value">@Abhijee Punia</div>
                    </div>
                    <div>
                        <div className="report-meta-label">Approved By</div>
                        <div className="report-meta-value">@Utkarsh Yadav</div>
                    </div>
                </div>
            </div>

            {/* Issue Summary */}
            <div className="report-card">
                <div className="report-card-title">Issue Summary</div>
                <div className="issue-box" style={{ padding: '16px', background: 'var(--accent)', borderRadius: '8px', fontSize: '14px', lineHeight: '1.5' }}>
                    Issues detected automatically based on visual differences.
                </div>
            </div>

            {/* Visual Evidence */}
            <div className="report-card">
                <div className="report-visual-header">
                    <div className="report-card-title">Visual Evidence</div>
                    <div>
                        <a
                            className="report-image-link"
                            href={result.diffImageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pixel difference heatmap image link
                        </a>
                    </div>
                </div>

                <div className="report-visual-row">
                    {/* Baseline */}
                    <div className="report-image-col">
                        <div className="report-image-frame">
                            <img src={result.baselineImageUrl} alt="Baseline" />
                        </div>
                        <a className="report-image-link" href={result.baselineImageUrl} target="_blank" rel="noopener noreferrer">
                            Baseline image
                        </a>
                    </div>

                    {/* Actual Implementation with Boxes */}
                    <div className="report-image-col">
                        <div className="report-image-frame">
                            <img src={result.actualImageUrl} alt="Actual Implementation" />
                            {result.coordinates.boxes.map((box) => (
                                <div
                                    key={box.id}
                                    className={`report-bounding-box severity-${box.severity || 'Low'}`}
                                    style={getBoxStyle(box)}
                                    title={`Issue: ${box.severity}`}
                                />
                            ))}
                        </div>
                        <a className="report-image-link" href={result.actualImageUrl} target="_blank" rel="noopener noreferrer">
                            Actual implementation image
                        </a>
                    </div>
                </div>

                <div className="report-legend">
                    <div className="report-legend-item">
                        <div className="report-legend-color" style={{ background: 'var(--major)' }}></div> Major
                    </div>
                    <div className="report-legend-item">
                        <div className="report-legend-color" style={{ background: 'var(--medium)' }}></div> Medium
                    </div>
                    <div className="report-legend-item">
                        <div className="report-legend-color" style={{ background: 'var(--low)' }}></div> Low
                    </div>
                </div>
            </div>

            {/* Issue List */}
            <div className="report-card">
                <div className="report-card-title">Issue List</div>
                <table className="report-table">
                    <thead>
                        <tr>
                            <th>Issue No.</th>
                            <th>Severity</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issues.map((issue, index) => (
                            <tr key={`${issue.id}-${index}`}>
                                <td>{String(index + 1).padStart(2, '0')}</td>
                                <td>{issue.severity}</td>
                                <td>{issue.type}</td>
                                <td>{issue.description}</td>
                            </tr>
                        ))}
                        {issues.length === 0 && (
                            <tr>
                                <td colSpan={4} style={{ textAlign: 'center', color: 'var(--muted)' }}>No detailed issues found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="report-footer">
                Report generated automatically · For internal QA use only
            </div>

        </div>
    );
};
