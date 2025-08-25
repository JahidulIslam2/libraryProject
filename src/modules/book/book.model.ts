import { Schema,model,Document } from "mongoose";

const GENRES = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY"
];


// TypeScript interface for Book document
export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  updateAvailability(): Promise<IBook>;
}

const bookSchema = new Schema<IBook>({
    title:{type:String, required:true},
    author:{type:String, required:true},
    genre:{type:String, required:true,enum:GENRES},
    isbn:{type:String, required:true, unique:true},
    description:{type:String},
    copies:{
        type:Number,
        required:true,
        min:[0,"Copies must be at least 1"],
        validate:{
            validator: Number.isInteger,
            message: "Copies must be an integer"
        }
    },
    available: {type:Boolean, default:true}

},{ timestamps:true });


//instance methods to update availability based on copies

bookSchema.methods.updateAvailability = function(){
    this.available = this.copies > 0;
    return this.save();
};

//middleweare , after saving , ensure availability is correct

bookSchema.post('save', function(doc){
    if(doc.copies === 0 && doc.available !== false){
        doc.available = false;
        doc.save();
    }
});

export const Book = model<IBook>("Book", bookSchema);