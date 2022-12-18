const { register, login, sendResetEmail, resetPassWord } = require("../controllers/auth");
const { verifyToken } = require("../middleware/middleware");
const router = require("express").Router();

router.post('/register',register)
router.post('/login',login)
router.post('/forgot',sendResetEmail)
router.put('/reset',verifyToken,resetPassWord)

module.exports = router;