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
            const result = await booksService.viewBookInfo(req.body.data.book_id)
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
                const result = await booksService.addBooks(req.body.data)
                res.json(result)
            }
            else
                res.json({success: false, message: "Uaauthorized"})
                //redirect to user home*/
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
                const result = await booksService.updateBookInfo(req.body.data.book_id, req.body.data.title, req.body.data.author, req.body.data.cover, req.body.data.category, req.body.data.edition, req.body.data.language, req.body.data.description, req.body.data.count)
                res.json(result)
            }
            else
                res.json({success: false, message: "Unauthorized"})
                //redirect to user home*/
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
                const result = await booksService.deleteBooks(req.body.data)
                res.json(result)
            }
            else
                res.json({success: false, message: "Unauthorized"})
                //redirect to user home*/
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new BooksController()