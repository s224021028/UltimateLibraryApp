const models = require("../models")

const requestsModel = models.requestsModel

class RequestsService
{
    async viewUserRequests(req)
    {
        try
        {
            const userID = {user_id: req.session.user.username}
            const userRequests = await requestsModel.find(userID)
            return userRequests
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async makeUserRequest(req)
    {
        const makeRequestRes = {success: false, request_id: null}
        try
        {
            const userID = req.session.user.username
            const requests = await requestsModel.countDocuments({})
            var requestID = requests + 1
            const requestInfo = {request_id: requestID, user_id: userID, book_title: req.body.book_title, book_author: req.body.book_author, isbn: req.body.isbn, book_language: req.body.book_language}
            await requestsModel.create(requestInfo)
            makeRequestRes.success = true
            makeRequestRes.request_id = requestID
        }
        catch(err)
        {
            makeRequestRes.success = false
            makeRequestRes.request_id = null
            console.error(err)
        }
        return makeRequestRes
    }

    async viewAdminRequests(req)
    {
        try
        {
            const requests = await requestsModel.find({})
            return requests
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async updateAdminRequest(req)
    {
        const updateRequestRes = {success: false, request_id: null}
        try
        {
            const requestID = {request_id: req.body.data.request_id}
            const requestStatus = {status: req.body.data.status}
            await requestsModel.updateOne(requestID, {$set: requestStatus})
            updateRequestRes.success = true
            updateRequestRes.request_id = requestID.request_id
        }
        catch(err)
        {
            updateRequestRes.success = false
            updateRequestRes.request_id = null
            console.error(err)
        }
        return updateRequestRes
    }
}
module.exports = new RequestsService()