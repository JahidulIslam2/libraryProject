import express, { Application } from "express";
import cors from "cors";
import { borrowRouter } from "./modules/borrow/borrow.route";


// const app: Application = express();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/borrow", borrowRouter);

export default app;
