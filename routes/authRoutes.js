const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
console.log(authController);

// @route   GET /auth/register

router.get('/register', authController.showRegister);
router.post('/register', authController.registerUser);
router.get('/login', authController.showLogin);   // ✅ must be defined
router.post('/login', authController.loginUser);
router.get('/logout', authController.logoutUser);
router.get("/about" ,(req, res)=>{
    res.render("auth/about");
})


module.exports = router;
