const User = require('../models/users')

const loginUser = async (req, res, next) => {
    const {userName, password} = req.body

    function checkUser(usernameL , passwordL){
        User.findOne({userName: usernameL, password: passwordL})
        .then((result) => {
            if (result) {
                return res.status(200).json({massage:'username and password is correct'})
            } else {
               return res.status(404).json({massage:'invalid username or password'})
            }

        })
        .catch(() => {
           return res.status(500).json({massage:'internal server error'})
        });
    }

        checkUser(userName , password)
}

exports.loginUser = loginUser