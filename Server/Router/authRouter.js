const express = require('express');
const {SignUp, SignIn, LogOut} = require('../controler/auth.js')

const router = express.Router();

router.post('/user/auth/signup',SignUp)
router.post('/user/auth/signin',SignIn)
router.get('/user/auth/logout',LogOut)


module.exports = router