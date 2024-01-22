const services = require("../services")

const reservationsService = services.reservationsService

class ReservationsController
{
    async viewUserReservations(req, res)
    {
        try
        {
            if(req.session.user && !req.session.user.admin)
            {
                const result = reservationsService.viewUserReservations(req)
                res.json(result)
            }
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
                const result = reservationsService.makeUserReservation(req)
                res.json(result)
            }
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
                const result = reservationsService.viewAdminReservations(req)
                res.json(result)
            }
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
                const result = reservationsService.updateAdminReservation(req)
                res.json(result)
            }
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new ReservationsController()