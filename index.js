const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

const { BookModel } = require('./Schema.js')

app.get('/', async (req, res) => {
    const books = await BookModel.find()
    res.render('../View/Pages/Books', { books: books })
})
app.get('/addbook', (req, res) => {
    res.render('../View/Pages/AddBooks')
})
app.post('/addbook', async (req, res) => {
    const book = req.body;

    const newBook = new BookModel(book);
    await newBook.save();

    res.redirect('/')
})
app.get('/deletebook/:id', async (req, res) => {
    const bookId = req.params.id;
    var result = await BookModel.deleteOne(({ _id: bookId }))
    res.redirect('/')
})
app.get('/updatebook/:id', async (req, res) => {
    const bookId = req.params.id;

    const book = await BookModel.findById(bookId);

    res.render('../View/Pages/UpdateBooks', { book });
})
app.post('/updatebook/:id', async (req, res) => {
    const bookId = req.params.id;
    const updatedBookData = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(bookId, updatedBookData, { new: true });

    res.redirect('/');
})
app.listen(8000, () => {
    console.log('Server Start On Port 8000..');
})