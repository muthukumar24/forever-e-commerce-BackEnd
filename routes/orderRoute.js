const express = require('express');
const {placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe} = require('../controllers/orderController.js')
const adminAuth = require('../middleware/adminAuth.js')
const authUser = require( '../middleware/auth.js')

const orderRouter = express.Router()

// Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Payment Features
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)

// User Feature 
orderRouter.post('/userorders',authUser,userOrders)

// verify payment
orderRouter.post('/verifyStripe',authUser, verifyStripe)

module.exports = orderRouter;