const models = require("../models")

const requestsModel = models.requestsModel

class RequestsService
{
    async viewUserRequests(user_ID)
    {
        try
        {
            const userID = {user_id: user_ID}
            const userRequests = await requestsModel.find(userID)
            return userRequests
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async makeUserRequest(userID, bookTitle, bookAuthor, bookIsbn, bookLanguage)
    {
        const makeRequestRes = {success: false, request_id: null}
        try
        {
            const requests = await requestsModel.countDocuments({})
            var requestID = requests + 1
            const requestInfo = {request_id: requestID, user_id: userID, book_title: bookTitle, book_author: bookAuthor, isbn: bookIsbn, book_language: bookLanguage}
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

    async updateAdminRequest(request_ID, request_Status)
    {
        const updateRequestRes = {success: false, request_id: null, user_id: null}
        try
        {
            const requestID = {request_id: request_ID}
            const requestStatus = {status: request_Status}
            await requestsModel.updateOne(requestID, {$set: requestStatus})
            const requestInfo = await requestsModel.findOne(requestID).exec()
            updateRequestRes.success = true
            updateRequestRes.request_id = requestID.request_id
            updateRequestRes.user_id = requestInfo.user_id
        }
        catch(err)
        {
            updateRequestRes.success = false
            updateRequestRes.request_id = null
            updateRequestRes.user_id = null
            console.error(err)
        }
        return updateRequestRes
    }
}
module.exports = new RequestsService()