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
            res.json(result)
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new UsersController()