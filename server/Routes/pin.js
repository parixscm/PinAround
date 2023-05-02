const { createPin, getPins } = require("../Controllers/pin");

const router = require("express").Router();

router.get("/", getPins);
router.post("/", createPin);

module.exports = router;
