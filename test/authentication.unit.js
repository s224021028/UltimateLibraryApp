let expect
import('chai').then(chai => {
    expect = chai.expect
});
const services = require("../services")
const usersService = services.usersService;

describe("Authentication Unit Testing", () => {
    before(() => {
        require("../db.connection")
    })
    describe("Login", () => {
        it("should return username as admin and role as Admin", async () => {
            const result = await usersService.login("admin", "Admin@123")
            expect(result).to.have.property("id").and.to.equal("admin")
            expect(result).to.have.property("isAdmin").and.to.be.true
        })
        it("should return username as empty and message as User not found", async () => {
            const result = await usersService.login("admin1", "Admin@123")
            expect(result).to.have.property("id").and.to.equal("")
            expect(result).to.have.property("message").to.be.equal("User not found")
        })
        it("should return username as empty and message as Incorrect password", async () => {
            const result = await usersService.login("admin", "Admin@1233")
            expect(result).to.have.property("id").and.to.equal("")
            expect(result).to.have.property("message").to.be.equal("Incorrect password")
        })
    })
})