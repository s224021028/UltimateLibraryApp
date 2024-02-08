let expect
import('chai').then(chai => {
    expect = chai.expect
})
const services = require("../services")

const reservationsService = services.reservationsService;

describe("Reservations Unit Testing", () => {
    before(async () => {
        require("../db.connection")
    })
    describe("User Reservation", () => {
        it("should return an array of length greater than or equal to 0", async () => {
            const result = await reservationsService.viewUserReservations("roy97")
            expect(result).to.be.an("array").and.to.have.length.greaterThanOrEqual(0)
        })
    })
    describe("Admin Reservation", () => {
        it("should return an array of length greater than or equal to 0", async () => {
            const result = await reservationsService.viewAdminReservations({})
            expect(result).to.be.an("array").and.to.have.length.greaterThanOrEqual(0)
        })
    })
})