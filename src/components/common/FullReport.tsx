import React, { useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ReportDocument } from './ReportDocument';

interface FullReportProps {
    screens: any[];
    onDone: () => void;
}

const FullReport: React.FC<FullReportProps> = ({ screens, onDone }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!screens || screens.length === 0) {
            onDone();
            return;
        }

        const awaitImages = async (element: HTMLElement) => {
            const images = element.querySelectorAll('img');
            const promises = Array.from(images).map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });
            await Promise.all(promises);
        };

        const generatePDF = async () => {
            try {
                const pages = containerRef.current?.querySelectorAll('.screen-report-page');

                if (!pages || pages.length === 0) {
                    onDone();
                    return;
                }

                // Ensure page is at top
                window.scrollTo(0, 0);

                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'px',
                    format: 'a4',
                });

                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i] as HTMLElement;

                    // Wait for images
                    await awaitImages(page);

                    // Ensure the specific page is visible
                    page.style.display = 'block';

                    try {
                        const canvas = await html2canvas(page, {
                            scale: 2,
                            useCORS: true,
                            allowTaint: true,
                            backgroundColor: '#ffffff',
                            logging: false,
                            scrollX: 0,
                            scrollY: 0,
                            // Remove custom window dimensions to let it auto-detect from DOM
                        });

                        const imgData = canvas.toDataURL('image/png');
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

                        if (i > 0) pdf.addPage();

                        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
                    } catch (pageError) {
                        console.error(`Error processing page ${i + 1}:`, pageError);
                    }
                }

                pdf.save('Combined_UI_Report.pdf');
            } catch (error) {
                console.error("Critical error generating PDF:", error);
                alert("Failed to generate PDF report.");
            } finally {
                onDone();
            }
        };

        // Delay to ensure DOM is painted and images loaded
        const timeoutId = setTimeout(generatePDF, 500);
        return () => clearTimeout(timeoutId);
    }, [screens, onDone]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute', // Absolute positioning to flow with document
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 10000,
                background: 'white',
                minHeight: '100vh',
                padding: '20px'
            }}
        >
            <div style={{ position: 'fixed', top: '20px', right: '20px', color: 'black', fontWeight: 'bold', zIndex: 10001, background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                Generating PDF...
            </div>

            <div style={{ width: '960px', margin: '0 auto' }}>
                {screens.map((screen, index) => (
                    <div
                        key={index}
                        className="screen-report-page"
                        style={{
                            pageBreakAfter: 'always',
                            breakAfter: 'page',
                            marginBottom: '20px'
                        }}
                    >
                        <ReportDocument
                            result={screen.result}
                            modelResult={screen.modelResult}
                            projectName={screen.projectName}
                            appName={screen.appName}
                            deviceType={screen.deviceType}
                            buildName={screen.buildName}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullReport;
