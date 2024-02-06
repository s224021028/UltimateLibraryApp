const models = require("../models")

const reservationsModel = models.reservationsModel

class ReservationsService
{
    async viewUserReservations(user_ID)
    {
        try
        {
            const userID = {user_id: user_ID}
            const userReservations = await reservationsModel.find(userID)
            return userReservations
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async makeUserReservation(userID, bookID)
    {
        const {updateBookCount} = require("../services").booksService
        const makeReservationRes = {success: false, reservation_id: null, book_id: null}
        try
        {
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

    async updateAdminReservation(reservation_ID, reservationStatus)
    {
        const {updateBookCount} = require("../services").booksService
        const updateReservationRes = {success: false, reservation_id: null, user_id: null}
        try
        {
            const reservationID = {reservation_id: reservation_ID}
            const updatedReservationInfo = {status: reservationStatus}
            if(reservationStatus == "Returned")
            {
                const returnDate = Date.now()
                updatedReservationInfo.return_date = returnDate
                const reservedBook = await reservationsModel.findOne(reservationID).exec()
                const res = await updateBookCount(reservedBook.book_id, true)
            }
            await reservationsModel.updateOne(reservationID, {$set: updatedReservationInfo})
            const reservationInfo = await reservationsModel.findOne(reservationID).exec()
            updateReservationRes.success = true
            updateReservationRes.reservation_id = reservationID.reservation_id
            updateReservationRes.user_id = reservationInfo.user_id
        }
        catch(err)
        {
            updateReservationRes.success = false
            updateReservationRes.reservation_id = null
            updateReservationRes.user_id = null
            console.error(err)
        }
        return updateReservationRes
    }
}
module.exports = new ReservationsService()