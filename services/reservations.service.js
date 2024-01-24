const models = require("../models")

const reservationsModel = models.reservationsModel

class ReservationsService
{
    async viewUserReservations(req)
    {
        try
        {
            const userID = {user_id: req.session.user.username}
            const userReservations = await reservationsModel.find(userID)
            return userReservations
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async makeUserReservation(req)
    {
        const {updateBookCount} = require("../services").booksService
        const makeReservationRes = {success: false, reservation_id: null, book_id: null}
        try
        {
            const userID = req.session.user.username
            const bookID = req.body.data.book_id
            const res = await updateBookCount(bookID, false)
            if(res)
            {
                const reservations = await reservationsModel.countDocuments({})
                var reservationID = reservations + 1
                const reservationInfo = {reservation_id: reservationID, user_id: userID, book_id: bookID}
                await reservationsModel.create(reservationInfo)
                makeReservationRes.success = true
                makeReservationRes.reservation_id = reservationID
                makeReservationRes.book_id = bookID
            }
            else
            {
                makeReservationRes.success = false
                makeReservationRes.reservation_id = null
                makeReservationRes.book_id = null
            }
        }
        catch(err)
        {
            makeReservationRes.success = false
            makeReservationRes.reservation_id = null
            makeReservationRes.book_id = null
            console.error(err)
        }
        return makeReservationRes
    }

    async viewAdminReservations(req)
    {
        try
        {
            const reservations = await reservationsModel.find({})
            return reservations
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async updateAdminReservation(req)
    {
        const {updateBookCount} = require("../services").booksService
        const updateReservationRes = {success: false, reservation_id: null}
        try
        {
            const reservationID = {reservation_id: req.body.data.reservation_id}
            const reservationStatus = req.body.data.status
            const updatedReservationInfo = {status: reservationStatus}
            if(reservationStatus == "Returned")
            {
                const returnDate = Date.now()
                updatedReservationInfo.return_date = returnDate
                const reservedBook = await reservationsModel.find(reservationID).select("book_id")
                const res = await updateBookCount(reservedBook[0].book_id, true)
            }
            await reservationsModel.updateOne(reservationID, {$set: updatedReservationInfo})
            updateReservationRes.success = true
            updateReservationRes.reservation_id = reservationID
        }
        catch(err)
        {
            updateReservationRes.success = false
            updateReservationRes.reservation_id = null
            console.error(err)
        }
        return updateReservationRes
    }
}
module.exports = new ReservationsService()