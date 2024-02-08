const services = require("../services")

const usersService = services.usersService

class UsersController
{
    async register(req, res) 
    {
        try
        {
            const result = await usersService.register(req.body.user_id, req.body.password, req.body.name)
            res.json(result)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async login(req, res)
    {
        try
        {
            const result = await usersService.login(req.query.user_id, req.query.password)
            if(result.success == true)
            {
                req.session.regenerate((err) => {
                    if(err)
                        next(err)
                })
                req.session.user = {username: req.query.user_id, admin: result.isAdmin}
                req.session.save((err) => {
                    if(err)
                        next(err)
                })
            }
            res.json(result)
        }
        catch(err)
        {
            console.error(err)
        }
    }

    logout(req, res)
    {
        var logoutRes = {success: false}
        try
        {
            if(req.session)
            {
                req.session.destroy((err) => {
                    if(err)
                        next(err)
                })
                logoutRes.success = true
            }
        }
        catch(err)
        {
            logoutRes.success = false
            console.error(err)
        }
        res.json(logoutRes)
    }
}
module.exports = new UsersController()