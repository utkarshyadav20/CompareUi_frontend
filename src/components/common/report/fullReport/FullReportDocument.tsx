import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Link, Font } from '@react-pdf/renderer';
import { API_BASE_URL } from '../../../../api/config';
import coverBg from '../../../../assets/coverbg.png';
import { relative } from 'path';
import lastBg from '../../../../assets/lastpage.png';
// Register fonts (same as PDFReportDocument)
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
Font.register({
    family: 'InstrumentSans',
    fonts: [
        {
            src: 'https://cdn.jsdelivr.net/fontsource/fonts/instrument-sans@latest/latin-400-normal.ttf',
            fontWeight: 400,
        },
        {
            src: 'https://cdn.jsdelivr.net/fontsource/fonts/instrument-sans@latest/latin-500-normal.ttf',
            fontWeight: 500,
        },
        {
            src: 'https://cdn.jsdelivr.net/fontsource/fonts/instrument-sans@latest/latin-600-normal.ttf',
            fontWeight: 600,
        },
        {
            src: 'https://cdn.jsdelivr.net/fontsource/fonts/instrument-sans@latest/latin-700-normal.ttf',
            fontWeight: 700,
        },
    ],
});

const getProxyUrl = (url: string) => {
    if (!url) return '';
    const baseUrl = API_BASE_URL.replace(/\/$/, '');
    return `${baseUrl}/figma/proxy-image?url=${encodeURIComponent(url)}`;
};

// --- Interfaces for the Full Report Data ---

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

interface Issue {
    id: string;
    type: string;
    description: string;
}

interface RowData {
    projectId: string;
    buildId: string;
    screenName: string;
    resultStatus: string;
    diffPercent: number;
    diffImageUrl: string;
    baselineImageUrl: string;
    actualImageUrl: string;
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
    modelAnalysis: {
        id: number;
        coordsVsText: Issue[] | null;
    };
}

interface FullReportData {
    details: {
        projectId: string;
        projectName: string;
        projectType: string;
        buildId: string;
        buildName: string;
        timestamp: string;
    };
    rows: RowData[];
}

interface FullReportDocumentProps {
    data: FullReportData;
}

// --- Styles (Adapted from PDFReportDocument) ---

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
        width: "100%",
        

    },
    title: {
        fontFamily: 'InstrumentSans',
        letterSpacing: '-.500px',
        fontSize: 18,
        fontWeight: 600,
        marginBottom: 4,
        width: "100%",        // limit width to 94% of viewport
        whiteSpace: 'normal',    // allow wrapping
        wordBreak: 'break-word', // break long words if needed
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
        fontSize: 12,
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
        fontWeight: 300,
        color: '#6B7280',
        marginBottom: 2,
    },
    value: {
        fontSize: 10,
        fontWeight: 400,
    },
    bold: {
        fontWeight: 500,
    },
    fail: {
        color: '#FF0000',
        fontWeight: 600,
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
        height: 250,
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
        fontWeight: 500,
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
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 8,
        color: '#6B7280',
    },
    coverPage: {
        padding: 0,
        position: 'relative',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Poppins',
    },

    coverBg: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100 %',   // A4 width in pt
        height: '100%',
        zIndex: -10, // A4 height in pt
    },
    lastBg: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100 %',   // A4 width in pt
        height: '100%',
        zIndex: -10, // A4 height in pt
    },
    coverContent: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        textAlign: 'left',
    },

    coverTitle: {
        position: 'absolute',
        fontFamily: 'InstrumentSans',
        letterSpacing: '-1.5px',
        fontSize: 45,
        fontWeight: 600,
        left: 20,
        bottom: 320,

        textAlign: 'left',
        color: '#000000',
    },

    coverprojectName: {
        fontFamily: 'InstrumentSans',
        letterSpacing: '-.500px',
        position: 'relative',
        textAlign: 'left',
        fontSize: 26,
        fontWeight: 500,
        color: '#000000',
        marginBottom: 6,
    },

    coverdevice: {
        fontFamily: 'InstrumentSans',
        letterSpacing: '-.500px',
        position: 'relative',
        textAlign: 'left',
        fontSize: 18,
        fontWeight: 400,
        color: '#000000',
        marginBottom: 6,
    },



    coverdot: {
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#9CA3AF',
        marginHorizontal: 8,
    },

    coverfooter: {
        fontFamily: 'InstrumentSans',
        letterSpacing: '-.461px',
        position: 'absolute',
        bottom: 32,
        left: 20,
        textAlign: 'left',
        fontSize: 10,
        color: '#000000',
    },

});

export const FullReportDocument: React.FC<FullReportDocumentProps> = ({ data }) => {
    const { details, rows } = data;

    const formattedDate = new Date(details.timestamp).toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }) + " IST";

    const getBoxStyle = (box: Box, scale: number) => {
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
            {/* Page 1: Cover / Project Info */}
            <Page size="A4" style={styles.coverPage} wrap={false}>

                {/* Background */}
                <Image src={coverBg} style={styles.coverBg} />
                <Text style={styles.coverTitle}>
                    {"UI Comparison \nReport"}
                </Text>
                {/* Main Content */}
                <View style={styles.coverContent}>

                    <Text style={styles.coverprojectName}>
                        {details.projectName}
                    </Text>

                    <Text style={styles.coverdevice}>
                        {details.projectType}
                    </Text>

                    <Text style={styles.coverdevice}>{"Production"} · {details.buildName}</Text>
                </View>

                {/* Footer */}
                <Text style={styles.coverfooter}>
                    {"Device Model"} · {formattedDate}
                </Text>

            </Page>


            {/* Consecutive Pages: One per Row (Screen Result) */}
            {
                rows.map((row, index) => {
                    const dimensions = row.coordinates?.dimensions || { width: 1920, height: 1080 };
                    const { width: originalWidth, height: originalHeight } = dimensions;

                    const displayWidth = 240;
                    const scale = displayWidth / originalWidth;
                    const displayHeight = originalHeight * scale;

                    const issues = (row.modelAnalysis?.coordsVsText || []).map(issue => {
                        const box = row.coordinates?.boxes?.find(b => b.id === issue.id);
                        return {
                            ...issue,
                            severity: box?.severity || 'Low' // Default if not found
                        };
                    });

                    // Helper to merge model issues if needed, similar to DetailedResult but kept simple for PDF
                    // or assume prepared data. The mock data has specific issues.

                    return (
                        <Page key={index} size="A4" style={styles.page}>
                            {/* Header */}
                            <View style={styles.header}>
                                <View style={{ maxWidth: '1600px' }}>
                                    <Text style={styles.title}>{row.screenName}</Text>
                                    <Text style={styles.subtitle}>
                                        {details.projectName} · {details.projectType} · {details.buildName}
                                    </Text>
                                </View>
                                <View style={[
                                    styles.status,
                                    row.resultStatus.toLowerCase() === 'pass'
                                        ? { color: '#00C950', backgroundColor: 'rgba(0, 201, 80, 0.1)' }
                                        : {}
                                ]}>
                                    <Text>{row.resultStatus}</Text>
                                </View>
                            </View>

                            {/* Result Summary */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Summary</Text>
                                <View style={styles.grid}>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Difference</Text>
                                        <Text style={[styles.value, styles.bold]}>{row.diffPercent}%</Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Status</Text>
                                        <Text style={[
                                            styles.value,
                                            styles.bold,
                                            row.resultStatus.toLowerCase() === 'pass' ? styles.pass : styles.fail
                                        ]}>
                                            {row.resultStatus}
                                        </Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Issues</Text>
                                        <Text style={[styles.value, styles.bold]}>{row.coordinates?.boxes?.length || 0}</Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>generated by</Text>
                                        <Text style={[styles.value]}>{"@Abhijeet Punia"}</Text>
                                    </View>
                                    <View style={styles.column}>
                                        <Text style={styles.label}>Approved by</Text>
                                        <Text style={[styles.value ]}>{"@Utkarsh Yadav"}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Visual Evidence */}
                            <View style={styles.section}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                                    <Text style={styles.sectionTitle}>Visual Evidence</Text>
                                    <Link src={row.diffImageUrl} style={styles.link}>Heatmap Link</Link>
                                </View>

                                <View style={styles.imagesContainer}>
                                    {/* Baseline */}
                                    <View style={styles.imageCol}>
                                        <View style={[styles.imageFrame, { width: displayWidth, height: displayHeight }]}>
                                            <Image
                                                src={getProxyUrl(row.baselineImageUrl)}
                                                style={[styles.image, { objectFit: 'fill' }]}
                                            />
                                        </View>
                                        <Link src={row.baselineImageUrl} style={styles.link}>Baseline</Link>
                                    </View>

                                    {/* Actual */}
                                    <View style={styles.imageCol}>
                                        <View style={[styles.imageFrame, { width: displayWidth, height: displayHeight }]}>
                                            <Image
                                                src={getProxyUrl(row.actualImageUrl)}
                                                style={[styles.image, { objectFit: 'fill' }]}
                                            />
                                            {(row.coordinates?.boxes || []).map((box) => (
                                                <View
                                                    key={box.id}
                                                    style={[styles.boundingBox, getBoxStyle(box, scale)]}
                                                />
                                            ))}
                                        </View>
                                        <Link src={row.actualImageUrl} style={styles.link}>Actual</Link>
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

                            {/* Issue List */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Issues</Text>
                                <View style={styles.table}>
                                    <View style={[styles.tableRow, { backgroundColor: '#F3F4F6', borderBottomWidth: 2 }]} fixed>
                                        <Text style={[styles.tableHeader, styles.col1]}>No.</Text>
                                        <Text style={[styles.tableHeader, styles.col2]}>Severity</Text>
                                        <Text style={[styles.tableHeader, styles.col3]}>Type</Text>
                                        <Text style={[styles.tableHeader, styles.col4]}>Description</Text>
                                    </View>
                                    {issues.map((issue, issueIndex) => (
                                        <View key={`${issue.id}-${issueIndex}`} style={styles.tableRow} wrap={false}>
                                            <Text style={[styles.tableCell, styles.col1]}>{String(issueIndex + 1).padStart(2, '0')}</Text>
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
                                Page {index + 2} · {row.screenName} · Automated Report
                            </Text>
                        </Page>
                    );
                })
            }

            {/* Page3: lastProject Info */}
            <Page size="A4" style={styles.coverPage} wrap={false}>
                {/* Background */}
                <Image src={lastBg} style={styles.lastBg} />
            </Page>
        </Document>
    );
};
