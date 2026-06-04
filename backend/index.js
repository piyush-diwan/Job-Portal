import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import { router as jobRoute } from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: [
        "http://localhost:5173",
        `${process.env.FRONTEND_URL}`
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running successfully"
    });
});

// 1. Database connection globally call karo
connectDB();

// 2. Agar deployment Vercel par NAHI hai (yani Render ya Local h), toh listen karo
if (!process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
}

// 3. Vercel ke serverless functions ke liye app export karna zaroori hai
export default app;