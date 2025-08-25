import express from "express";
import { createBook, deleteBook, getAllBooks, getBookById, updateBook } from "./book.controller";




const router = express.Router();


//create book
router.post('/', createBook);


//get all books 
router.get('/', getAllBooks);


// Get a book by ID
router.get("/:bookId", getBookById);

// Update a book by ID
router.put("/:bookId", updateBook);

// Delete a book by ID
router.delete("/:bookId", deleteBook);

export const bookRouter = router;

