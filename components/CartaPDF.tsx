import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer"

const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12 },
    header: { textAlign: "center", marginBottom: 20 },
    title: { fontSize: 18, fontWeight: "bold" },
    businessInfo: { textAlign: "center", marginBottom: 10 },
    product: { flexDirection: "row", justifyContent: "space-between", marginBottom: 5 },
    productName: { fontWeight: "bold" },
    logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 10 },
})

const CartaPDF = ({ business, products }: { business: any, products: any[] }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                {business.logoUrl && <Image src={business.logoUrl} style={styles.logo} />}
                <Text style={styles.title}>{business.name}</Text>
                <Text>{business.description}</Text>
            </View>

            <Text style={{ fontSize: 14, marginBottom: 10 }}>Productos:</Text>
            {products.map((product) => (
                <View key={product.id} style={styles.product}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text>${product.price.toFixed(2)}</Text>
                </View>
            ))}
        </Page>
    </Document>
)

export default CartaPDF
