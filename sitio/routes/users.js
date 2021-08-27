var express = require('express');
var router = express.Router();

const {register,login, processRegister, processLogin, logout} = require('../controllers/usersController');

const registerValidator = require('../validations/registerValidator');
const loginValidator =require('../validations/loginValidator');

const registeValidator = require('../validations/registerValidator');

router.get('/login', login);
router.post('/register', registerValidator, processRegister)
router.post('/login', loginValidator, processLogin);
router.get('/logout', logout);

module.exports = router;