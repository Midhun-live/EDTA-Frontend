import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: { padding: 30, backgroundColor: "#f8fafc" },
    title: { fontSize: 20, marginBottom: 6, color: "#0369a1", fontWeight: "bold" },
    subtitle: { fontSize: 12, marginBottom: 20, color: "#475569" },
    patientSection: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderLeftWidth: 4,
        borderLeftColor: "#0284c7",
        marginBottom: 20,
        borderRadius: 4,
    },
    sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10, color: "#1e293b" },
    row: { flexDirection: "row", justifyContent: "space-between" },
    col: { flexDirection: "column", flex: 1 },
    section: { marginBottom: 15, padding: 15, borderWidth: 1, borderColor: "#e2e8f0", borderRadius: 4, backgroundColor: "#ffffff" },
    categoryTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 10, textTransform: "capitalize", color: "#1e293b" },
    label: { fontSize: 10, color: "#64748b", marginBottom: 4 },
    text: { fontSize: 12, fontWeight: "bold", color: "#0f172a" },
    subLabel: { fontSize: 10, fontWeight: "bold", color: "#64748b", marginTop: 6, marginBottom: 4 },
    listItem: { fontSize: 10, marginBottom: 3, paddingLeft: 10, color: "#334155", lineHeight: 1.4 },
    separator: { height: 1, backgroundColor: "#e2e8f0", marginVertical: 8 }
});

function formatDate(dateStr?: string) {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "-";

    const day = date.getDate();
    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";

    return `${day}${suffix} ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;
}

type Section = {
    equipment?: string[];
    care_instructions?: string[];
};

type Assessment = {
    patient?: {
        name?: string;
        age?: number;
        discharge_date?: string;
    };
    output?: Record<string, Section>;
};

export default function AssessmentPDF({ assessment }: { assessment: Assessment }) {
    const patient = assessment.patient || {};
    const output = assessment.output || {};

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Equipment Recommendation Report</Text>
                <Text style={styles.subtitle}>Eldersmiles Discharge Triage Assessment</Text>

                <View style={styles.patientSection}>
                    <Text style={styles.sectionTitle}>Patient Summary</Text>
                    <View style={styles.row}>
                        <View style={styles.col}>
                            <Text style={styles.label}>Name</Text>
                            <Text style={styles.text}>{patient.name || "-"}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Age</Text>
                            <Text style={styles.text}>{patient.age ? `${patient.age} years` : "-"}</Text>
                        </View>
                        <View style={styles.col}>
                            <Text style={styles.label}>Discharge Date</Text>
                            <Text style={styles.text}>{formatDate(patient.discharge_date)}</Text>
                        </View>
                    </View>
                </View>

                {Object.entries(output).map(([sectionName, section]) => {
                    const equipment = section.equipment || [];
                    const care = section.care_instructions || [];

                    if (!equipment.length && !care.length) return null;

                    return (
                        <View key={sectionName} style={styles.section}>
                            <Text style={styles.categoryTitle}>{sectionName.replace(/_/g, " ")}</Text>

                            {equipment.length > 0 && (
                                <View>
                                    <Text style={styles.subLabel}>Equipment</Text>
                                    {equipment.map((item, i) => (
                                        <Text key={i} style={styles.listItem}>• {item}</Text>
                                    ))}
                                </View>
                            )}

                            {equipment.length > 0 && care.length > 0 && <View style={styles.separator} />}

                            {care.length > 0 && (
                                <View>
                                    <Text style={styles.subLabel}>Care Instructions</Text>
                                    {care.map((item, i) => (
                                        <Text key={i} style={styles.listItem}>• {item}</Text>
                                    ))}
                                </View>
                            )}
                        </View>
                    );
                })}
            </Page>
        </Document>
    );
}
