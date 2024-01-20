const express = require("express")
const controllers = require("../controllers")

const router = express.Router()
const usersController = controllers.usersController
const booksController = controllers.booksController
const requestsController = controllers.requestsController
const reservationsController = controllers.reservationsController

router.get("/", (req, res) => {
    booksController.getAllBooks(req, res)
})
router.post("/user/register", (req, res) => {
    usersController.register(req, res)
})
router.get("/user/login", (req, res) => {
    usersController.login(req, res)
})
router.get("/user/logout", (req, res) => {
    usersController.logout(req, res)
})
router.get("/user/view/book", (req, res) => {
    booksController.viewBookInfo(req, res)
})
router.post("/admin/add/books", (req, res) => {
    booksController.addBooks(req, res)
})
router.post("/admin/update/book", (req, res) => {
    booksController.updateBookInfo(req, res)
})
router.get("/admin/delete/books", (req, res) => {
    booksController.deleteBooks(req, res)
})
router.get("/user/view/requests", (req, res) => {
    requestsController.viewUserRequests(req, res)
})
router.post("/user/make/request", (req, res) => {
    requestsController.makeUserRequest(req, res)
})
router.get("/admin/view/requests", (req, res) => {
    requestsController.viewAdminRequests(req, res)
})
router.post("/admin/update/request", (req,res) => {
    requestsController.updateAdminRequest(req, res)
})
router.get("/user/view/reservations", (req, res) => {
    reservationsController.viewUserReservations(req, res)
})
router.post("/user/make/reservation", (req, res) => {
    reservationsController.makeUserReservation(req, res)
})
router.get("/admin/view/reservations", (req, res) => {
    reservationsController.viewAdminReservations(req, res)
})
router.post("/admin/update/reservation", (req,res) => {
    reservationsController.updateAdminReservation(req, res)
})
module.exports = router