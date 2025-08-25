import express from "express";
import { borrowBook,getBorrowSummary } from "./borrow.controller";



const router = express.Router();

//borrow a book
//post/api/borrow
router.post("/", borrowBook);

//get borrow summary
//get/api/borrow
router.get("/summary",getBorrowSummary);

export const borrowRouter=router;
