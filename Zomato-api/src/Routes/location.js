const express = require('express');   //important
const LocationModel = require('../Models/location.js');

const router = express.Router()  
router.get('/getLocation', async (req, res) => {
    try {
        const data = await LocationModel.find();
        res.status(200).json({ "status": 200, "data": data, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})


module.exports = router; 