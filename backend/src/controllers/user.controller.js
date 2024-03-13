import { asynchandler } from "../utils/asynchandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sendEmail from "../utils/NodeMailer.js";
import generatePDF from "../utils/PDFInvoice.js";
// import { ShippingModel } from "../models/userInvoice.model.js";

const sendInvoice = asynchandler(async (req, res) => {
  const { name, email, creditCardNo, signatureImageUrl } = req.body;
  const address = `${req.body.street}, ${req.body.city}, ${req.body.state} ${req.body.zip}`;
  if (
    [name, email, address, creditCardNo].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const pdfData = {
    name: name,
    email,
    address,
    creditCardNo,
    // Add more invoice data as needed
  };

  if (!pdfData) {
    throw new ApiError(500, "Something went wrong while making payment");
  }

  const pdfBuffer = await generatePDF(pdfData, signatureImageUrl);

  const sendmail = await sendEmail(
    email,
    "Your Invoice",
    `Please find your attached invoice`,
    pdfBuffer
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Pdf invoice is sent successfully"));
});

export { sendInvoice };
