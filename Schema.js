const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/BooksStorage')
const BookSchema = new mongoose.Schema({
    title: {
        type: String
    },
    type: {
        type: String
    },
    stock: {
        type: String
    },
    price: {
        type: Number
    },
    published: {
        type: Date
    },
    author: {
        type: String
    }
})

const BookModel = mongoose.model('BOOK', BookSchema)
module.exports = { BookModel } 