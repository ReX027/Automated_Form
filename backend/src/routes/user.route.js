import { Router } from "express";
import { sendInvoice } from "../controllers/user.controller.js";

const router = Router();

//Secured routes
router.route("/shipping-form").post(sendInvoice);

export default router;
