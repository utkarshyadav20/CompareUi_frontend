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

                // Hide all pages initially to ensure clean capture flow
                pages.forEach((p) => ((p as HTMLElement).style.display = 'none'));

                // Ensure page is at top
                window.scrollTo(0, 0);

                let pdf: jsPDF | null = null;

                for (let i = 0; i < pages.length; i++) {
                    const page = pages[i] as HTMLElement;

                    // Show current page
                    page.style.display = 'block';

                    // Wait for images
                    await awaitImages(page);

                    try {
                        const canvas = await html2canvas(page, {
                            scale: 2,
                            useCORS: true,
                            allowTaint: false,
                            backgroundColor: '#ffffff',
                            logging: false,
                            scrollX: 0,
                            scrollY: -window.scrollY,
                            windowWidth: 1600, // Force large width to avoid cropping
                            windowHeight: document.documentElement.offsetHeight,
                            onclone: (clonedDoc: Document) => {
                                const root = clonedDoc.documentElement;
                                // Fix variables for html2canvas
                                root.style.setProperty('--ring', '#000000');
                                root.style.setProperty('--foreground', '#000000');
                                root.style.setProperty('--background', '#ffffff');
                                root.style.setProperty('--card', '#ffffff');
                                root.style.setProperty('--card-foreground', '#000000');
                                root.style.setProperty('--popover', '#ffffff');
                                root.style.setProperty('--primary', '#000000');
                                root.style.setProperty('--secondary', '#ffffff');
                                root.style.setProperty('--muted', '#f3f4f6');
                                root.style.setProperty('--accent', '#f3f4f6');
                                root.style.setProperty('--destructive', '#ef4444');
                                root.style.setProperty('--border', '#e5e7eb');
                                root.style.setProperty('--input', '#e5e7eb');
                                // Fallback colors
                                root.style.setProperty('--color-red-400', '#ff0000');
                                root.style.setProperty('--color-red-500', '#ff0000');
                                root.style.setProperty('--color-green-400', '#00ff00');
                                root.style.setProperty('--color-green-500', '#00ff00');
                            }
                        });

                        const imgData = canvas.toDataURL('image/png');
                        const imgWidth = canvas.width;
                        const imgHeight = canvas.height;

                        if (!pdf) {
                            // Initialize PDF with the dimensions of the first page
                            pdf = new jsPDF({
                                orientation: imgWidth > imgHeight ? 'landscape' : 'portrait',
                                unit: 'px',
                                format: [imgWidth, imgHeight]
                            });
                        } else {
                            // Add subsequent pages with their own dimensions
                            pdf.addPage([imgWidth, imgHeight], imgWidth > imgHeight ? 'landscape' : 'portrait');
                        }

                        // Add image at 1:1 scale (matching the page size)
                        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

                    } catch (pageError) {
                        console.error(`Error processing page ${i + 1}:`, pageError);
                    }

                    // Hide page again after capture
                    page.style.display = 'none';
                }

                if (pdf) {
                    pdf.save('Combined_UI_Report.pdf');
                } else {
                    console.error("No PDF generated");
                }

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
                position: 'fixed',
                top: 0,
                left: '-10000px', // Move off-screen to hide from user
                width: '100%',
                zIndex: -1, // Ensure it doesn't overlay anything
                background: 'white',
                minHeight: '100vh',
                padding: '20px',
                visibility: 'visible' // Must be visible for html2canvas
            }}
        >
            {/* Generating text is no longer needed since it's hidden */}


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
