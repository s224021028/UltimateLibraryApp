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
            const result = await booksService.viewBookInfo(req)
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
                const result = await booksService.addBooks(req)
                res.json(result)
            }
            /*else
                redirect to user home*/
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
                const result = await booksService.updateBookInfo(req)
                res.json(result)
            }
            /*else
                redirect to user home*/
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
                const result = await booksService.deleteBooks(req)
                res.json(result)
            }
            /*else
                redirect to user home*/
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async uploadImage(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await booksService.uploadImage(req)
                res.json(result)
            }
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new BooksController()