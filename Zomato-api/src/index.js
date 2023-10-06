const express = require('express');
const mongoose = require('mongoose');
var cors = require("cors");

// mongoDB url
const mongoString = "mongodb://0.0.0.0:27017/week"
// router files
const locationRouter = require('./Routes/location');
const restaurantRouter = require('./Routes/restaurant');
const mealtypeRouter = require('./Routes/mealtype');
const paymentRouter=require('./Routes/payment');
const userRouter = require('./Routes/user');



mongoose.connect(mongoString);
const database = mongoose.connection;



database.on('error', (error) => {
  console.log("error",error)
})

database.once('connected', () => {
  console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/location', locationRouter)
app.use('/api/restaurants',restaurantRouter)
app.use('/api/mealtype', mealtypeRouter)
app.use('/api/restaurants/filter',restaurantRouter)
app.use('/api/payment', paymentRouter)
app.use('/api/user',userRouter)
app.use('/api/user',userRouter)




app.use((req, res, next) => {
  res.status(404).send({ "status": 404, "message": "API URL Not Found", "error": true });
});

app.listen(4000, () => {
  console.log(`Server Started at ${4000}`)
})