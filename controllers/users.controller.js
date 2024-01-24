const services = require("../services")

const usersService = services.usersService

class UsersController
{
    async register(req, res) 
    {
        try
        {
            const result = await usersService.register(req)
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
            const result = await usersService.login(req)
            if(result.success == true)
            {
                req.session.regenerate((err) => {
                    if(err)
                        next(err)
                })
                req.session.user = {username: req.body.user_id, admin: result.isAdmin}
                req.session.save((err) => {
                    if(err)
                        next(err)
                })
                /*if(req.session.user.admin)
                    redirect to admin home
                else
                    redirect to user home*/
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
        //redirect to home
    }
}
module.exports = new UsersController()