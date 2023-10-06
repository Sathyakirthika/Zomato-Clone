const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');

const ResaturantModel = require('../Models/restaurant');
const restaurant = require('../Models/restaurant');
// const restaurant = require('../Models/restaurant');

const router = express.Router()

router.get('/getRestaurants', async (req, res) => {
    try {
        const data = await ResaturantModel.find();
        var restaurantData = {
            "restaurant": data,
            "restaurantCount": data.length
        }
        console.log("restaurantData",restaurantData)
        res.status(200).json({ "status": 200, "data": restaurantData, "message": "Successfully", "error": false })
    }
        catch (error) {
            res.status(400).json({ "status": 400, "message": error.message, "error": true })
        }
})
router.get('/restaurantlocation/:id', async (req, res) => {
    try {
        var filter = req.params.id.length > 5 ? { _id: req.params.id } : { location_id: req.params.id }
        let data = await ResaturantModel.find(filter);
        var restaurantData = {

            "restaurant": data,
            "restaurantCount": data.length
        }
        res.status(200).json({ "status": 200, "data": restaurantData, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
  })

// router.get('/getRestaurants/:id', async (req, res) => {
//     try {
//         var filter = req.params.id.length > 3 ? { _id: req.params.id } : { location_id: req.params.id }
//         const data = await ResaturantModel.find(filter);
//         var restaurantData = {
//             "restaurant": data,
//             "restaurantCount": data.length
//         }
//         res.status(200).json({ "status": 200, "data": restaurantData, "message": "Successfully", "error": false })
//     }
//     catch (error) {
//         res.status(400).json({ "status": 400, "message": error.message, "error": true })
//     }
// })
router.get('/getrestaurants/:id', async (req, res) => {
    const resId = req.params.id; 
    if (!mongoose.Types.ObjectId.isValid(resId)) {
        return res.status(400).json({ error: "Invalid 'id' parameter" });
    }
    try {
        const restaurant = await ResaturantModel.findById(resId);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        const mealitems = restaurant.mealitems;

        res.status(200).json({
            message: "Restaurant fetched successfully",
            restaurant: restaurant,
            mealitems: mealitems, // Include mealitems in the response
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getRestaurantDetails/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const data = await ResaturantModel.findOne({ _id: req.params.id });
        var restaurantData = {
            "restaurant": data,
            "restauranCount": data.length
        }
        res.status(200).json({ "status": 200, "data": restaurantData, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})
console.log(restaurant);




// router.get('/menuitems/:resId', async (req, res) => {
//     try {
//         console.log(req.params.resId)
//         const data = await ResaturantModel.findOne({ _id: req.params.resId }, { cuisine: 1, _id: 0 });
//         var restaurantData = {
//             "cuisine": data.cuisine,
//             "cuisineCount": data.length
//         }
//         res.status(200).json({ "status": 200, "data": restaurantData, "message": "Successfully", "error": false })
//     }
//     catch (error) {
//         res.status(400).json({ "status": 400, "message": error.message, "error": true })
//     }
// })
// router.get('/Restaurantmenuitems/:resmenuId', async (req, res) => {
//         try {
//             console.log(req.params.resmenuId)
//             const data = await ResaturantModel.findOne({ _id: req.params.resmenuId });
//             var restaurantmenuData = {
//                 "ResMenu": data,
//                 "MenuItemCount": data.length
//             }
//             res.status(200).json({ "status": 200, "data":restaurantmenuData ,"message": "Successfully", "error": false })
//         }
//         catch (error) {
//             res.status(400).json({ "status": 400, "message": error.message, "error": true })
//         }
//     })
    router.post('/filter', async (req, res) => {
        let {mealtype_id, locations, cuisine, lcost, hcost, sort, page } = req.body;
        console.log("data is", req.body);
      
        sort = sort ? sort : 1;
        page = page ? page : 1;
      
        const ItemsPerPage = 2;
      
        let startIndex = ItemsPerPage * page - ItemsPerPage;
        let endIndex = ItemsPerPage * page + 1;
      
        let filterObj = {};
      
        mealtype_id && (filterObj['mealtype_id'] = mealtype_id);
        locations && (filterObj['location_id'] = locations);
        cuisine && (filterObj['cuisine'] = { $in: cuisine });
        lcost && hcost && (filterObj['min_price'] = { $lte: hcost, $gte: lcost });
      
        ResaturantModel.find(filterObj).sort({ min_price: sort }).then(response => {
            const paginatedResponse = response.slice(startIndex, endIndex);
            let arr = [];
            for (let i=1; i<=Math.ceil(response.length / ItemsPerPage); i++){
                arr.push(i);
            }
      
            res.status(200).json({
              message: "Restaurants added successfully",
              restaurants: paginatedResponse, 
              pageCount: arr,
              currentPage: page
            });
          })
      
          .catch(err => {
            res.status(500).json({ error: err });
          });
      });
      module.exports = router;  
    