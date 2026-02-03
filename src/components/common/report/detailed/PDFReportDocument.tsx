import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';

import { API_BASE_URL } from '../../../../api/config';

// Register fonts
Font.register({
    family: 'Poppins',
    fonts: [
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-300-normal.ttf', fontWeight: 300 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-400-normal.ttf', fontWeight: 400 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-500-normal.ttf', fontWeight: 500 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-600-normal.ttf', fontWeight: 600 },
        { src: 'https://cdn.jsdelivr.net/fontsource/fonts/poppins@latest/latin-700-normal.ttf', fontWeight: 700 },
    ],
});

const getProxyUrl = (url: string) => {
    if (!url) return '';
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    return `${baseUrl}/figma/proxy-image?url=${encodeURIComponent(url)}`;
};

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

interface PDFReportDocumentProps {
    result: ResultData;
    modelResult: IssueData | null;
    projectName?: string;
    appName?: string;
    deviceType?: string;
    buildName?: string;
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Poppins',
        fontSize: 10,
        color: '#1F2937',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    title: {
        fontSize: 18, // Reduced from 22
        fontWeight: 600,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 10,
        fontWeight: 300,
        color: '#6B7280',
    },
    status: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        fontSize: 10,
        fontWeight: 600,
        color: '#FF0000',
        backgroundColor: 'rgba(255, 0, 0, 0.1)',
        textTransform: 'uppercase',
    },
    section: {
        marginBottom: 15,
        border: '1px solid #E5E7EB',
        backgroundColor: '#FBFBFB',
        padding: 15,
    },
    sectionTitle: {
        fontSize: 12, // Reduced from 14
        fontWeight: 500,
        marginBottom: 10,
    },
    grid: {
        flexDirection: 'row',
        gap: 20,
    },
    column: {
        flex: 1,
        flexDirection: 'column',
        gap: 8,
    },
    label: {
        fontSize: 8,
        fontWeight: 300, // Light weight
        color: '#6B7280',
        marginBottom: 2,
    },
    value: {
        fontSize: 10,
        fontWeight: 400, // Regular
    },
    bold: {
        fontWeight: 500, // Reduced from bold
    },
    fail: {
        color: '#FF0000',
        fontWeight: 600, // Reduced from bold
        textTransform: 'uppercase',
    },
    pass: {
        color: '#00C950',
        fontWeight: 600,
        textTransform: 'uppercase',
    },
    imagesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginBottom: 10,
    },
    imageCol: {
        width: '48%',
        flexDirection: 'column',
        gap: 5,
        alignItems: 'center',
    },
    imageFrame: {
        width: '100%',
        border: '1px solid #E5E7EB',
        position: 'relative',
        height: 250, // Fixed height for PDF layout
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    },
    boundingBox: {
        position: 'absolute',
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
    link: {
        fontSize: 8,
        color: '#2563EB',
        textDecoration: 'underline',
        textAlign: 'center',
    },
    legend: {
        flexDirection: 'row',
        gap: 15,
        marginTop: 5,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        fontSize: 10,
    },
    legendColor: {
        width: 15,
        height: 8,
    },
    table: {
        width: '100%',
        marginTop: 10,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingVertical: 10,
        marginBottom: 10,
    },
    tableHeader: {
        fontWeight: 500, // Reduced from bold
        color: '#6B7280',
        fontSize: 9,
    },
    tableCell: {
        fontSize: 9,
        paddingHorizontal: 2,
    },
    col1: { width: '10%' },
    col2: { width: '15%' },
    col3: { width: '20%' },
    col4: { width: '55%' },
    footer: {
        marginTop: 'auto',
        textAlign: 'center',
        fontSize: 8,
        color: '#6B7280',
    },
});

export const PDFReportDocument: React.FC<PDFReportDocumentProps> = ({
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

    // Prepare issues
    const issues = (modelResult?.coordsVsText || []).map(issue => {
        const boxes = result.coordinates?.boxes || [];
        const box = boxes.find(b => b.id === issue.id);
        return {
            ...issue,
            severity: box?.severity || 'Low'
        };
    });

    // Normalize status for presentation
    const normalizeStatus = (status: any) => {
        const s = (status ?? '').toString().toLowerCase();
        if (s === '1' || s === 'pass' || s === 'passed') return 'PASSED';
        if (s === '0' || s === 'fail' || s === 'failed' || s === 'error') return 'FAILED';
        if (s === '2' || s === 'inprogress') return 'IN PROGRESS';
        if (s === '3' || s === 'on hold') return 'ON HOLD';
        return s.toUpperCase();
    };

    const statusText = normalizeStatus(result.resultStatus);
    const isPass = statusText === 'PASSED';

    const dimensions = result.coordinates?.dimensions || { width: 1920, height: 1080 };
    const { width: originalWidth, height: originalHeight } = dimensions;

    // Calculate display dimensions to match the column width
    // Page: 595pt. Margins/Padding: ~90-100pt. Two cols. ~250pt width. Use 240 to avoid wrapping.
    const displayWidth = 240;
    const scale = displayWidth / originalWidth;
    const displayHeight = originalHeight * scale;

    const getBoxStyle = (box: Box) => {
        // Use absolute points (pt) based on scale to avoid percentage ambiguity
        return {
            left: box.x * scale,
            top: box.y * scale,
            width: box.width * scale,
            height: box.height * scale,
            borderColor: box.severity === 'Major' ? '#FF0000' : box.severity === 'Medium' ? '#2F2FE6' : '#D08700',
        };
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <View>
                        <Text style={styles.title}>UI Image Comparison Report</Text>
                        <Text style={styles.subtitle}>
                            {projectName} · {appName || 'No App Name'} · {modelResult?.projectType || deviceType} · {result.screenName}
                        </Text>
                    </View>
                    <View style={[styles.status, isPass ? { color: '#00C950', backgroundColor: 'rgba(0, 201, 80, 0.1)' } : {}]}>
                        <Text>{statusText}</Text>
                    </View>
                </View>

                {/* Project Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Project Information</Text>
                    <View style={styles.grid}>
                        <View style={styles.column}>
                            <View>
                                <Text style={styles.label}>Project Name</Text>
                                <Text style={styles.value}>{projectName}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Application Name</Text>
                                <Text style={styles.value}>{appName || 'No App Name'}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Timestamp</Text>
                                <Text style={styles.value}>{formattedDate}</Text>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View>
                                <Text style={styles.label}>Screen Name</Text>
                                <Text style={styles.value}>{result.screenName}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Device</Text>
                                <Text style={styles.value}>{modelResult?.projectType || deviceType}</Text>
                            </View>
                            <View>
                                <Text style={styles.label}>Build</Text>
                                <Text style={styles.value}>{buildName || result.buildId}</Text>
                            </View>
                        </View>
                        <View style={styles.column}>
                            <View>
                                <Text style={styles.label}>Environment</Text>
                                <Text style={styles.value}>Stage</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Result Summary */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Result Summary</Text>
                    <View style={styles.grid}>
                        <View style={styles.column}>
                            <Text style={styles.label}>Difference Percentage</Text>
                            <Text style={[styles.value, styles.bold]}>{result.diffPercent}%</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Test Status</Text>
                            <Text style={[styles.value, isPass ? styles.pass : styles.fail]}>{statusText}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Total Issues Detected</Text>
                            <Text style={[styles.value, styles.bold]}>{result.coordinates?.boxes?.length || 0}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Generated By</Text>
                            <Text style={styles.value}>@Abhijeet Punia</Text>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.label}>Approved By</Text>
                            <Text style={styles.value}>@Utkarsh Yadav</Text>
                        </View>
                    </View>
                </View>

                {/* Visual Evidence */}
                {/* Ensure no flex expansion and standard height behavior */}
                <View style={[styles.section]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                        <Text style={styles.sectionTitle}>Visual Evidence</Text>
                        <Link src={result.diffImageUrl} style={styles.link}>Pixel difference heatmap image link</Link>
                    </View>

                    <View style={styles.imagesContainer}>
                        {/* Baseline */}
                        <View style={styles.imageCol}>
                            <View style={[styles.imageFrame, { width: displayWidth, height: displayHeight }]}>
                                <Image
                                    src={getProxyUrl(result.baselineImageUrl)}
                                    style={[styles.image, { objectFit: 'fill' }]}
                                />
                            </View>
                            <Link src={result.baselineImageUrl} style={styles.link}>Baseline image</Link>
                        </View>

                        {/* Actual with Boxes */}
                        <View style={styles.imageCol}>
                            {/* Use fixed width and dynamic height to ensure exact aspect ratio match */}
                            <View style={[styles.imageFrame, { width: displayWidth, height: displayHeight }]}>
                                <Image
                                    src={getProxyUrl(result.actualImageUrl)}
                                    style={[styles.image, { objectFit: 'fill' }]}
                                />
                                {(result.coordinates?.boxes || []).map((box) => (
                                    <View
                                        key={box.id}
                                        style={[styles.boundingBox, getBoxStyle(box)]}
                                    />
                                ))}
                            </View>
                            <Link src={result.actualImageUrl} style={styles.link}>Actual implementation image</Link>
                        </View>
                    </View>

                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: '#FF0000' }]} />
                            <Text>Major</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: '#2F2FE6' }]} />
                            <Text>Medium</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendColor, { backgroundColor: '#D08700' }]} />
                            <Text>Low</Text>
                        </View>
                    </View>
                </View>

                {/* Issue List - on next page if needed */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Issue List</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, { backgroundColor: '#F3F4F6', borderBottomWidth: 2 }]} fixed>
                            <Text style={[styles.tableHeader, styles.col1]}>No.</Text>
                            <Text style={[styles.tableHeader, styles.col2]}>Severity</Text>
                            <Text style={[styles.tableHeader, styles.col3]}>Type</Text>
                            <Text style={[styles.tableHeader, styles.col4]}>Description</Text>
                        </View>
                        {issues.map((issue, index) => (
                            <View key={`${issue.id}-${index}`} style={styles.tableRow} wrap={false}>
                                <Text style={[styles.tableCell, styles.col1]}>{String(index + 1).padStart(2, '0')}</Text>
                                <Text style={[styles.tableCell, styles.col2]}>{issue.severity}</Text>
                                <Text style={[styles.tableCell, styles.col3]}>{issue.type}</Text>
                                <Text style={[styles.tableCell, styles.col4]}>{issue.description.replace(/\n/g, ' ')}</Text>
                            </View>
                        ))}
                        {issues.length === 0 && (
                            <View style={[styles.tableRow, { justifyContent: 'center', padding: 10 }]}>
                                <Text style={{ color: '#9CA3AF' }}>No detailed issues found.</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Footer */}
                <Text style={styles.footer} fixed>
                    Report generated automatically · For internal QA use only
                </Text>
            </Page>
        </Document>
    );
};
