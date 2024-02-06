let expect
import('chai').then(chai => {
    expect = chai.expect
})
const services = require("../services")

const requestsService = services.requestsService;

describe("Requests Unit Testing", () => {
    before(async () => {
        require("../db.connection")
    })
    describe("User Request", () => {
        it("should return an array of length greater than or equal to 0", async () => {
            const result = await requestsService.viewUserRequests("roy97")
            expect(result).to.be.an("array").and.to.have.length.greaterThanOrEqual(0)
        })
    })
    describe("Admin Request", () => {
        it("should return an array of length greater than or equal to 0", async () => {
            const result = await requestsService.viewAdminRequests({})
            expect(result).to.be.an("array").and.to.have.length.greaterThanOrEqual(0)
        })
    })
})