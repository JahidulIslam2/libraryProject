import { Request, Response, NextFunction } from "express";
import { Borrow } from "./borrow.model";
import { Book } from "../book/book.model";



const borrowBook=async (req:Request,res:Response, next:NextFunction) =>{
try{
    const {book:bookId,quantity,dueDate}=req.body;

    //Find Book
    const book =await Book.findById(bookId);
    if(!book){
        return res.status(404).json({
            success:false,
            message:"Book not found",
            error:"Book Not Found"
        });
    }


    //check available copies
    if(book.copies < quantity){
        return res.status(400).json({
            success:false,
            message:"copies Unavailable",
            error:"Insufficient Copies"
        })
    }

    //Deduct quantity and update availability 

    book.copies -= quantity;
    await book.updateAvailability();
   
    //create new borrow record

    const borrow = await Borrow.create({
        book: book._id,
        quantity,
        dueDate
    });

    return res.status(201).json({
        success:true,
        message:"Book borrowed successfully",
        data: borrow
    })
}catch(err){
    next(err)
}
};



