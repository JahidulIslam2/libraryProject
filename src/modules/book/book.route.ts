import express from "express";
import { createBook, getAllBooks } from "./book.controller";




const router = express.Router();


//create book
router.post('/', createBook);


//get all books 
router.get('/', getAllBooks);

