const fs = require("fs")
const mime = require("mime-types")
const models = require("../models")
var booksData = require("../data/books.json")

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
            const bookID = {book_id: req.body.data.book_id}
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
        const addBooksRes = {success: false, book_ids: []}
        try
        {
            const booksCount = await booksModel.countDocuments({})
            var bookID = booksCount
            var newBooks = req.body.data
            for(var i = 0;i < newBooks.length;i++)
            {
                bookID++
                newBooks[i].book_id = bookID
                addBooksRes.book_ids.push(newBooks[i].book_id)
            }
            await booksModel.insertMany(newBooks)
            addBooksRes.success = true
        }
        catch(err)
        {
            addBooksRes.success = false
            addBooksRes.book_ids = []
            console.error(err)
        }
        return addBooksRes
    }

    async updateBookInfo(req)
    {
        const updateBookRes = {success: false, book_id: null}
        try
        {
            const bookID = {book_id: req.body.data.book_id}
            const updatedBookInfo = {title: req.body.data.title, author: req.body.data.author, cover: req.body.data.cover, category: req.body.data.category, edition: req.body.data.edition, description: req.body.data.description, count: req.body.data.count}
            await booksModel.updateOne(bookID, {$set: updatedBookInfo})
            updateBookRes.success = true
            updateBookRes.book_id = bookID.book_id
        }
        catch(err)
        {
            updateBookRes.success = false
            updateBookRes.book_id = null
            console.error(err)
        }
        return updateBookRes
    }

    async deleteBooks(req)
    {
        const deleteBooksRes = {success: false, book_ids: []}
        try
        {
            const bookIDs = req.body.data
            await booksModel.deleteMany({book_id: {$in: bookIDs}})
            deleteBooksRes.success = true
            deleteBooksRes.book_ids = bookIDs
        }
        catch(error)
        {
            deleteBooksRes.success = false
            deleteBooksRes.book_ids = []
            console.error(err)
        }
        return deleteBooksRes
    }

    async updateBookCount(book_id, increase)
    {
        try
        {
            const bookID = {book_id: book_id}
            var bookCount = await booksModel.find(bookID).select("count")
            if(increase)
            {
                bookCount[0].count++
            }
            else
            {
                bookCount[0].count--
            }
            const updatedBookCount = {count: bookCount[0].count}
            await booksModel.updateOne(bookID, {$set: updatedBookCount})
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async #populateBooks()
    {
        try
        {
            const booksCount = await booksModel.countDocuments({})
            if(booksCount == 0)
            {
                var bookID = booksCount
                for(var i = 0;i < booksData.length;i++)
                {
                    bookID++
                    booksData[i].book_id = bookID
                    const bookCoverBase64 = this.#encodeImage(booksData[i].cover)
                    const bookCoverMime = this.#getMimeType(booksData[i].cover)
                    booksData[i].cover = "data:" + bookCoverMime + ";base64," + bookCoverBase64
                }
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
            const coverImageBase64 = fs.readFileSync(coverImage, "base64")
            return coverImageBase64
        }
        catch(err)
        {
            console.error(err)
        }
    }

    #getMimeType(coverImage)
    {
        try
        {
            const coverImageMimeType = mime.lookup(coverImage)
            return coverImageMimeType
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new BooksService()