import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text, pdfData) => {
  try {
    // initialize and define the mode of transport
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Defining the mail and sending it using the transport
    const sentEmail = await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
      attachments: [
        {
          filename: "invoice.pdf",
          content: pdfData,
        },
      ],
    });

    const response = "Email sent successfully";

    return response;
  } catch (error) {
    throw error;
  }
};

export default sendEmail;
