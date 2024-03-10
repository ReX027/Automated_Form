import express from "express";
import cors from "cors";
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// app.use(cookieParser({ limit: "4KB" }))
app.get("/", (req, res) => {
  res.send("Hi welcome to my server");
});

// routes import
import userRouter from "./routes/user.route.js";

// routes declaration
app.use("/api/user", userRouter);

export { app };
