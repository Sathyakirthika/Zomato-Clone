const express = require('express');

const mealtypeModel = require('../Models/mealtype');

const router = express.Router()

router.get('/getAllMealTypes', async (req, res) => {
    try {
        const mealtypedata = await mealtypeModel.find();
        res.status(200).json({ "status": 200, "data": mealtypedata, "message": "Successfully", "error": false })
    }
    catch (error) {
        res.status(400).json({ "status": 400, "message": error.message, "error": true })
    }
})

module.exports = router;