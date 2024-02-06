let expect
import('chai').then(chai => {
    expect = chai.expect
})
const services = require("../services")

const booksService = services.booksService;

describe("Operations Unit Testing", () => {
    before(async () => {
        require("../db.connection")
    })
    describe("User Operations", () => {
        it("should return an array of length greater than or equal to 0", async () => {
            const result = await booksService.getAllBooks({})
            expect(result).to.be.an("array").and.to.have.length.greaterThanOrEqual(0)
        })
        it("should return the details of the selected book", async () => {
            const result = await booksService.viewBookInfo(15)
            expect(result).to.have.property("book_id").and.to.equal(15)
            expect(result).to.have.property("title")
            expect(result).to.have.property("author")
            expect(result).to.have.property("cover")
            expect(result).to.have.property("category")
            expect(result).to.have.property("language")
            expect(result).to.have.property("edition")
            expect(result).to.have.property("description")
            expect(result).to.have.property("count").and.to.be.greaterThanOrEqual(0)
        })
    })
    describe("Admin Operations", () => {
        it("should return an array of length greater than or equal to 0", async () => {
            
        })
    })
})