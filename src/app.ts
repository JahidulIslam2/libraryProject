import express, { Application } from "express";
import cors from "cors";
import { borrowRouter } from "./modules/borrow/borrow.route";
import { bookRouter } from "./modules/book/book.route";


// const app: Application = express();
const app = express();
// Middleware
app.use(cors());
app.use(express.json());

// test 
    app.get("/", (req, res) => {
      res.send("Hello world");
    });

// Routes
app.use("/api/borrow", borrowRouter);
app.use("/api/books", bookRouter);



export default app;
