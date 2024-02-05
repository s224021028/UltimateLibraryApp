const bcrypt = require("bcrypt")
const models = require("../models")

const usersModel = models.usersModel

class UsersService
{
    constructor()
    {
        this.#createAdmin()
    }

    async register(req)
    {
        var registerRes = {success: false, message: ""}
        try
        {
            const userID = req.body.user_id
            const password = req.body.password
            const name = req.body.name
            const encryptedPassword = await this.#encryptPassword(password)
            const newUser = {user_id: userID, password: encryptedPassword, name: name}
            await usersModel.create(newUser)
            registerRes.success = true
            registerRes.message = "Registration successful"
        }
        catch(err)
        {
            registerRes.success = false
            if(err.name == "MongoServerError")
            {
                if(err.code == 11000)
                    registerRes.message = "Username exists"
            }
            console.error(err)
        }
        return registerRes
    }

    async login(req)
    {
        var loginRes = {success: false, message: "", id: "", isAdmin: false}
        try
        {
            const userName = {user_id: req.body.user_id}
            const loginInfo = await usersModel.findOne(userName).exec()
            loginRes.success = await this.#decryptPassword(req.body.password, loginInfo.password)
            if(loginRes.success == true)
            {
                loginRes.message = "Login successful"
                loginRes.id = userName.user_id
                loginRes.isAdmin = loginInfo.is_admin
            }
            else
                loginRes.message = "Incorrect password"
        }
        catch(err)
        {
            loginRes.success = false
            loginRes.id = ""
            if(err.name == "TypeError")
                loginRes.message = "User not found"
            console.error(err)
        }
        return loginRes
    }

    async #createAdmin()
    {
        try
        {
            const usersCount = await usersModel.countDocuments({})
            if(usersCount == 0)
            {
                var admin_user = {user_id: "admin", password: "Admin@123", name: "Admin User", is_admin: true}
                const encryptedPassword = await this.#encryptPassword(admin_user.password)
                admin_user.password = encryptedPassword
                await usersModel.create(admin_user)
            }
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async #encryptPassword(password)
    {
        try
        {
            const salt = await bcrypt.genSalt(10)
            const encryptedPassword = await bcrypt.hash(password, salt)
            return encryptedPassword
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async #decryptPassword(password, encryptedPassword)
    {
        try
        {
            const result = await bcrypt.compare(password, encryptedPassword)
            return result
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new UsersService()