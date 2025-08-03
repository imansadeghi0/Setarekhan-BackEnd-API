const express = require('express')

const router = express.Router()

const  userControllers = require('../controllers/user-controllers')
const  loginControllers = require('../controllers/login-controllets')

router.post('/signup',userControllers.addUser)

router.post('/login', loginControllers.loginUser)

module.exports = router
