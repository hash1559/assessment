const express = require("express");
const router = express.Router();
const aggregateController = require("../controllers/aggregateController");
router.get("/aggregate", aggregateController.getAggregateData);
module.exports = router;
