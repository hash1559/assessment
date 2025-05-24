const express = require("express");
const router = express.Router();
const aggregateController = require("../controllers/aggregator.controller");
router.get("/aggregate", aggregateController.getAggregatedData);
module.exports = router;
