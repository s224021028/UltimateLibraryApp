const services = require("../services")
const socket = require("../socket")

const requestsService = services.requestsService

class RequestsController
{
    async viewUserRequests(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = await requestsService.viewUserRequests(req.session.user.username)
                res.json(result)
            }
            else
                res.json({success: false, message: "Login required"})
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async makeUserRequest(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = await requestsService.makeUserRequest(req.session.user.username, req.body.book_title, req.body.book_author, req.body.isbn, req.body.book_language)
                res.json(result)
                if(socket.isRoom(req.session.user.username))
                    socket.sendNotification(req.session.user.username, "new_request", "success")
            }
            else
                res.json({success: false, message: "Login required"})
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async viewAdminRequests(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await requestsService.viewAdminRequests(req)
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

    async updateAdminRequest(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await requestsService.updateAdminRequest(req.body.request_id, req.body.status)
                res.json(result)
                if(socket.isRoom(result.user_id))
                    socket.sendNotification(result.user_id, "update_request", "success")
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
module.exports = new RequestsController()