import { NextFunction, Request, Response } from "express";
import { Book } from "./book.model";



export const createBook = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const book = await Book.create(req.body);
        res.status(201).json({
            success:true,
            message:"Book created successfully",
            data:book
        });
    } catch (error) {
        next(error);
    }
};

// get All Books with filter ,sort,pagination

export const getAllBooks = async (req:Request, res:Response, next:NextFunction) =>{
    try {
        const {filter, sortBy ="createdAt", sort = "desc",limit =10} = req.query;
        const query:any ={};
        if(filter){
            query.genre=filter;

        } 

        const books = await Book.find(query)
        .sort({[sortBy as string]:sort === "asc" ? 1: -1})
        .limit(Number(limit));

        return res.status(200).json({
            success:true,
            message:"Books retrieved successfully",
            data:books
        });


    } catch (error) {
        next(error);
    }
};



// Get Book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findById(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book
    });
  } catch (error) {
    next(error);
  }
};




// Update Book
export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book
    });
  } catch (error) {
    next(error);
  }
};


// Delete Book
export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
        error: "Book not found"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: null
    });
  } catch (error) {
    next(error);
  }
};