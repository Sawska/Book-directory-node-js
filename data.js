const { response } = require('express')
const express = require('express')
const router = express.Router()
const books = require('./books')

let bookDirectory = books
router.get('/books', (req,res) => {
        res.send(bookDirectory)
})

router.get('/books/:id', (req,res) => {
        const {id} = req.params

        const book = bookDirectory.find(b => b.isbn === id)

        if(!book) return res.status(404).send('book does not exist')

        res.send(book)
})

router.post('/', (req,res) => {
    const {
        title,
        isbn,
        Author, 
        pageCount,   
    } = req.body

    const bookExist = bookDirectory.find(b => b.isbn === isbn)

    if(bookExist) return res.send('Book alredy exists')

    const book = {
        title,
        isbn,
        Author,
        pageCount,  
    }
    bookDirectory.push(book)

    res.send(book)
})

router.put('/', (req,res) => {
    const {id} = req.params
    const {
        title,
        isbn,
        Author,
        pageCount,
    } = req.body

    const book = bookDirectory.find(b => b.isbn === id)

    if(!book) return res.send('Book does not exist')

    const updateField = (val,prev) => !val ? prev : val

    const updateBook = {
        ...book,
        title: updateField(title,book.title),
        Author: updateField(Author, book.Author),
        pageCount: updateField(pageCount, book.pageCount)
    }
    const index = bookDirectory.findIndex(b => b.isbn === id)
    bookDirectory.splice(index,1,updateBook)

    res.send(updateBook)
})
    
router.delete('/books/:id', (req,res) => {
        const {id} = req.params
    const find = bookDirectory.find(b=> b.isbn === id)

    if(!find) return res.status(404).send('Book does not exist')

    bookDirectory = bookDirectory.filter(b => b.isbn !== id)
})

module.exports = router