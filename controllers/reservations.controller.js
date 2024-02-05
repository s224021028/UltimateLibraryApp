const services = require("../services")
const socket = require("../socket")

const reservationsService = services.reservationsService

class ReservationsController
{
    async viewUserReservations(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = await reservationsService.viewUserReservations(req)
                res.json(result)
            }
            else
                res.json({success: false, message: "Login required"})
                //redirect to user home*/
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async makeUserReservation(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = await reservationsService.makeUserReservation(req)
                res.json(result)
                if(socket.isRoom(req.session.user.username))
                    socket.sendNotification(req.session.user.username, "new_reservation", "success")
            }
            else
                res.json({success: false, message: "Login required"})
                //redirect to user home*/
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async viewAdminReservations(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await reservationsService.viewAdminReservations(req)
                res.json(result)
            }
            else
                res.json({success: false, message: "Unauthorized"})
                //redirect to user home*/
        }
        catch(err)
        {
            console.error(err)
        }
    }

    async updateAdminReservation(req, res)
    {
        try
        {
            if(req.session.user && req.session.user.admin)
            {
                const result = await reservationsService.updateAdminReservation(req)
                res.json(result)
                if(socket.isRoom(result.user_id))
                    socket.sendNotification(result.user_id, "update_reservation", "success")
            }
            else
                res.json({success: false, message: "Unauthorized"})
                //redirect to user home*/
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new ReservationsController()