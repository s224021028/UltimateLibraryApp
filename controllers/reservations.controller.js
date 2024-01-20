const services = require("../services")

const reservationsService = services.reservationsService

class ReservationsController
{
    async viewUserReservations(req, res)
    {
        try
        {
            const result = reservationsService.viewUserReservations(req)
            res.json(result)
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
            const result = reservationsService.makeUserReservation(req)
            res.json(result)
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
            const result = reservationsService.viewAdminReservations(req)
            res.json(result)
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
            const result = reservationsService.updateAdminReservation(req)
            res.json(result)
        }
        catch(err)
        {
            console.error(err)
        }
    }
}
module.exports = new ReservationsController()