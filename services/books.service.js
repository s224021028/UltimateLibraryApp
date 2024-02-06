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
            const books = await booksModel.find({}).select(["book_id", "title", "author", "category", "cover"]).exec()
            return books
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async viewBookInfo(book_ID)
    {
        try
        {
            const bookID = {book_id: book_ID}
            const bookInfo = await booksModel.findOne(bookID).exec()
            return bookInfo
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async addBooks(data)
    {
        const addBooksRes = {success: false, book_ids: []}
        try
        {
            const booksCount = await booksModel.find({}).sort("-book_id").limit(1).select("book_id")
            var bookID = booksCount[0].book_id
            var newBooks = data
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

    async updateBookInfo(book_ID, bookTitle, bookAuthor, bookCover, bookCategory, bookEdition, bookLanguage, bookDescription, bookCount)
    {
        const updateBookRes = {success: false, book_id: null}
        try
        {
            const bookID = {book_id: book_ID}
            const updatedBookInfo = {title: bookTitle, author: bookAuthor, cover: bookCover, category: bookCategory, edition: bookEdition, language: bookLanguage, description: bookDescription, count: bookCount}
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

    async deleteBooks(data)
    {
        const deleteBooksRes = {success: false, book_ids: []}
        try
        {
            const bookIDs = data
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

    async updateBookCount(book_ID, increase)
    {
        try
        {
            const bookID = {book_id: book_ID}
            var bookInfo = await booksModel.findOne(bookID).exec()
            if(increase)
            {
                bookInfo.count++
            }
            else
            {
                if(bookInfo.count > 0)
                    bookInfo.count--
                else
                    return false
            }
            const updatedBookCount = {count: bookInfo.count}
            await booksModel.updateOne(bookID, {$set: updatedBookCount})
        }
        catch(err)
        {
            console.error(err)
        }
        return true
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