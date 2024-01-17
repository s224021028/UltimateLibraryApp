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
                req.session.user = {username: req.body.userID, admin: result.isAdmin}
                req.session.save((err) => {
                    if(err)
                        next(err)
                })
                console.log(req.session)
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
        req.session.destroy((err) => {
            if(err)
                next(err)
        })
        console.log(req.session)
        res.json({success: true})
        //redirect to home
    }
}
module.exports = new UsersController()