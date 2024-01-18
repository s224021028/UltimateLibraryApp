const models = require("../models")
const booksData = require("../data/books.json")

const booksModel = models.booksModel

class BooksService
{
    constructor()
    {
        this.#populateBooks()
    }

    async getAllBooks(req)
    {
        try
        {
            const books = await booksModel.find({}).select(["book_id", "title", "author", "cover"]).exec()
            return books
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async viewBookInfo(req)
    {
        try
        {
            const bookID = {book_id: req.body.bookID}
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
        const addBooksRes = {success: false, ids: []}
        try
        {
            var newBooks = req.body.data
            for(var i = 0;i < newBooks.length;i++)
            {
                const bookCoverBase64 = this.#encodeImage(newBooks[i].cover)
                newBooks[i].cover = bookCoverBase64
                addBooksRes.ids.push(newBooks[i].book_id)
            }
            await booksModel.insertMany(newBooks)
            addBooksRes.success = true
        }
        catch(err)
        {
            addBooksRes.success = false
            addBooksRes.ids = []
            console.error(err)
        }
        return addBooksRes
    }

    async updateBookInfo(req)
    {
        const updateBookRes = {success: false, id: null}
        try
        {
            const bookID = {book_id: req.body.data.book_id}
            const bookCoverBase64 = this.#encodeImage(req.body.data.cover)
            const updatedBookInfo = {title: req.body.data.title, author: req.body.data.author, cover: bookCoverBase64, category: req.body.data.category, edition: req.body.data.edition, description: req.body.data.description, count: req.body.data.count}
            await booksModel.updateOne(bookID, {$set: updatedBookInfo})
            updateBookRes.success = true
            updateBookRes.id = bookID.book_id
        }
        catch(err)
        {
            updateBookRes.success = false
            updateBookRes.id = null
            console.error(err)
        }
        return updateBookRes
    }

    async deleteBooks(req)
    {
        const deleteBooksRes = {success: false, ids: []}
        try
        {
            const bookIDs = req.body.data
            await booksModel.deleteMany({book_id: {$in: bookIDs}})
            deleteBooksRes.success = true
            deleteBooksRes.ids = bookIDs
        }
        catch(error)
        {
            deleteBooksRes.success = false
            deleteBooksRes.ids = []
            console.error(err)
        }
        return deleteBooksRes
    }

    async #populateBooks()
    {
        try
        {
            const booksCount = await booksModel.countDocuments({})
            if(booksCount == 0)
            {
                await booksModel.insertMany(booksData)
            }
        }
        catch(err)
        {
            console.error(err)
        }
    }

    #encodeImage(coverImage)
    {
        try
        {
            if(coverImage instanceof File)
            {
                console.log(coverImage.buffer.toString("base64"))
                return coverImage.buffer.toString("base64")
            }
            return coverImage
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new BooksService()