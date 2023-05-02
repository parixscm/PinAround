const { signUp, signIn } = require("../Controllers/user");

const router = require("express").Router();

router.post("/signup", signUp);
router.post("/signin", signIn);

module.exports = router;
