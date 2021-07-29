const mogoose= require('mongoose')

const {Schema, model}=mogoose

const BooksSchema = new Schema ({
    title: String,
    author: String, 
    genre: String
})

const Books = mode('Books', BooksSchema )

module.exports= Books