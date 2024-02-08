const services = require("../services")

const booksService = services.booksService

class BooksController
{
    async getAllBooks(req, res)
    {
        try
        {
            const result = await booksService.getAllBooks(req)
            res.json(result)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async viewBookInfo(req, res)
    {
        try
        {
            const result = await booksService.viewBookInfo(req.query.book_id)
            res.json(result)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async addBooks(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await booksService.addBooks(req.body)
                res.json(result)
            }
            else
                res.json({success: false, message: "Uaauthorized"})
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async updateBookInfo(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await booksService.updateBookInfo(req.body.book_id, req.body.title, req.body.author, req.body.cover, req.body.category, req.body.edition, req.body.language, req.body.description, req.body.count)
                res.json(result)
            }
            else
                res.json({success: false, message: "Unauthorized"})
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async deleteBooks(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await booksService.deleteBooks(req.query.data)
                res.json(result)
            }
            else
                res.json({success: false, message: "Unauthorized"})
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new BooksController()