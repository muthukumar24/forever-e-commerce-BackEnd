const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const connectCloudinary = require('./config/cloudinary.js');
const userRouter = require('./routes/userRoute.js')
const productRouter = require('./routes/productRoute.js')
const cartRouter = require('./routes/cartRoute.js')
const orderRouter = require('./routes/orderRoute.js')
require('dotenv').config();

// App Config
const app = express()
const PORT = process.env.PORT || 4000
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)


mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on Port: ${PORT}`)
        })
    })
    .catch( error => {
        console.log("Error connecting to MongoDB", error)
    });