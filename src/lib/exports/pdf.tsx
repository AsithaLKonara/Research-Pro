import React from "react";
import { Document, Page, Text, View, StyleSheet, pdf } from "@react-pdf/renderer";
import { RankedProduct } from "../research/ranking";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff"
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: "bold",
    color: "#111827"
  },
  productCard: {
    marginBottom: 20,
    padding: 15,
    border: "1pt solid #E5E7EB",
    borderRadius: 4
  },
  productHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10
  },
  modelName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937"
  },
  score: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2563EB"
  },
  detailsRow: {
    flexDirection: "row",
    marginBottom: 5
  },
  detailLabel: {
    width: 100,
    fontSize: 12,
    color: "#6B7280"
  },
  detailValue: {
    fontSize: 12,
    color: "#374151",
    flex: 1
  }
});

const ReportDocument = ({ products }: { products: RankedProduct[] }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Research Intelligence Report</Text>
      
      {products.map((product, index) => (
        <View key={index} style={styles.productCard}>
          <View style={styles.productHeader}>
            <Text style={styles.modelName}>{product.rank}. {product.modelName}</Text>
            <Text style={styles.score}>{product.overallScore}/100</Text>
          </View>
          
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Brand:</Text>
            <Text style={styles.detailValue}>{product.brand}</Text>
          </View>
          
          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Price:</Text>
            <Text style={styles.detailValue}>
              {product.price ? `$${product.price} ${product.currency}` : "N/A"}
            </Text>
          </View>

          <View style={styles.detailsRow}>
            <Text style={styles.detailLabel}>Rating:</Text>
            <Text style={styles.detailValue}>
              {product.rating ? `${product.rating} / 5.0` : "N/A"}
            </Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

/**
 * Triggers a browser download of the PDF report.
 */
export async function downloadPdf(products: RankedProduct[], filename: string = "research_report.pdf") {
  const blob = await pdf(<ReportDocument products={products} />).toBlob();
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
