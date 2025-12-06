import jsPDF from "jspdf";
import "jspdf-autotable";

export const generateOrdersPDF = (orders, userName) => {
    console.log("Starting PDF generation with", orders.length, "orders");

    try {
        if (!orders || orders.length === 0) {
            throw new Error("No orders to generate PDF");
        }

        const doc = new jsPDF("p", "mm", "a4");
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPosition = 10;

        // Title
        doc.setFontSize(18);
        doc.setTextColor(34, 139, 34);
        doc.text("MY ORDERS REPORT", pageWidth / 2, yPosition, { align: "center" });
        yPosition += 12;

        // User Info
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Customer: ${userName}`, 15, yPosition);
        yPosition += 6;

        const today = new Date().toLocaleDateString("en-US");
        doc.text(`Date: ${today}`, 15, yPosition);
        yPosition += 10;

        // Table
        const columns = ["No", "Product", "Note", "Price", "Address", "Phone", "Date"];
        const data = orders.map((order, idx) => [
            idx + 1,
            order.productName || "N/A",
            order.note || "-",
            `$${parseFloat(order.price || 0).toFixed(2)}`,
            order.address || "N/A",
            order.phone || "N/A",
            order.date ? new Date(order.date).toLocaleDateString() : "N/A"
        ]);

        doc.autoTable({
            columns: columns,
            body: data,
            startY: yPosition,
            theme: "grid",
            headStyles: {
                fillColor: [34, 139, 34],
                textColor: 255,
                fontStyle: "bold",
                fontSize: 9
            },
            bodyStyles: {
                fontSize: 8
            },
            alternateRowStyles: {
                fillColor: [240, 245, 240]
            }
        });

        // Summary
        const finalY = doc.lastAutoTable.finalY + 8;
        doc.setFontSize(11);
        doc.setTextColor(34, 139, 34);
        doc.text("SUMMARY", 15, finalY);

        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        const totalPrice = orders.reduce((sum, order) => sum + (parseFloat(order.price) || 0), 0);
        doc.text(`Total Orders: ${orders.length}`, 15, finalY + 6);
        doc.text(`Total Amount: $${totalPrice.toFixed(2)}`, 15, finalY + 11);

        // Save
        const filename = `orders_${new Date().toISOString().split("T")[0]}.pdf`;
        doc.save(filename);
        console.log("PDF saved successfully as", filename);

    } catch (error) {
        console.error("PDF Error:", error.message);
        throw error;
    }
};

