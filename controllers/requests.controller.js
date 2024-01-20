const services = require("../services")

const requestsService = services.requestsService

class RequestsController
{
    async viewUserRequests(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = await requestsService.viewUserRequests(req)
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

    async makeUserRequest(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = await requestsService.makeUserRequest(req)
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

    async viewAdminRequests(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await requestsService.viewAdminRequests(req)
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

    async updateAdminRequest(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await requestsService.updateAdminRequest(req)
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
}
module.exports = new RequestsController()