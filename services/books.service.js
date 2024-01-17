const models = require("../models")

const booksModel = models.booksModel
var addBooksRes = {success: false, message: ""}
var updateBookInfoRes = {success: false, message: ""}
var deleteBookRes = {success: false, message: ""}

class BooksService
{
    async getAllBooks(req)
    {
        try
        {
            const books = await booksModel.find({}).select(["book_id", "title", "author"]).exec()
            return books
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async viewBookInfo(req)
    {
        const bookID = {book_id: req.body.bookID}
        try
        {
            const bookInfo = await booksModel.findOne(bookID).exec()
            return bookInfo
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async addBooks(req)
    {
        const newBooks = req.body.data
        try
        {
            await booksModel.insertMany(newBooks)
            addBooksRes.success = true
            addBooksRes.message = "Books added"
        }
        catch(err)
        {
            addBooksRes.success = false
            addBooksRes.message = "Failed to add books"
            console.error(err)
        }
        return addBooksRes
    }

    async updateBookInfo(req)
    {
        const bookID = {book_id: req.body.bookID}
        const updatedBookInfo = {title: req.body.bookTitle, author: req.body.bookAuthor, category: req.body.bookCategory, edition: req.body.bookEdition, description: req.body.bookdescription, count: req.body.bookCount}
        try
        {
            await booksModel.updateOne(bookID, updatedBookInfo)
            updateBookInfoRes.success = true
            updateBookInfoRes.message = "Book info updated"
        }
        catch(err)
        {
            updateBookInfoRes.success = false
            updateBookInfoRes.message = "Failed to update book info"
            console.error(err)
        }
        return updateBookInfoRes
    }

    async deleteBook(req)
    {
        const bookID = {book_id: req.body.bookID}
        try
        {
            await booksModel.deleteOne(bookID)
            deleteBookRes.success = true
            deleteBookRes.message = "Book deleted"
        }
        catch(error)
        {
            deleteBookRes.success = false
            deleteBookRes.message = "Failed to delete book"
            console.error(err)
        }
        return deleteBookRes
    }
}
module.exports = new BooksService()