import pdfKit from "pdfkit";

const generatePDF = async (data, signatureImageUrl) => {
  return new Promise((resolve, reject) => {
    const buffers = [];
    const doc = new pdfKit({ margin: 50 });

    // Header
    doc.text("MyCompany", { align: "center" });
    doc.moveDown(0.5);
    doc.text("123 Main Street, City, Country", { align: "center" });
    doc.text("Phone: 123-456-7890 | Email: info@example.com", {
      align: "center",
    });
    doc.moveDown(1);

    // Customer Information
    doc.text(`Invoice for: ${data.name}`, { align: "left" });
    doc.text(`Email: ${data.email}`, { align: "left" });
    doc.text(`Address: ${data.address}`, { align: "left" });
    doc.moveDown(1);

    // Invoice Details
    doc.text(`Invoice Number: INV-${Date.now()}`, { align: "left" });
    doc.text(`Invoice Date: ${new Date().toLocaleDateString()}`, {
      align: "left",
    });
    doc.text(
      `Due Date: ${new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
      ).toLocaleDateString()}`,
      { align: "left" }
    );
    doc.moveDown(1);

    // Subtotal, Taxes, and Total
    doc.text(`Subtotal: $ 500`, { align: "right" });
    doc.text(`Tax: $ 23.12`, { align: "right" });
    doc.text(`Total: $ 523.12`, { align: "right" });
    doc.moveDown(1);

    // Payment Instructions
    doc.text("Payment Instructions:", { align: "left" });
    doc.text("Thank you for completing the payment process.", {
      align: "left",
    });
    doc.moveDown(1);
    doc.text("Candidate Signature", { align: "right" });
    doc.moveDown(1);
    if (signatureImageUrl) {
      doc.image(signatureImageUrl, 500, doc.y + 20, { width: 50 });
    }
    // Write PDF content to buffers
    doc.on("data", (buffer) => {
      buffers.push(buffer);
    });

    // When PDF generation is complete
    doc.on("end", () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    // End the PDF generation
    doc.end();
  });
};

export default generatePDF;
