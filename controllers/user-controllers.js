const User = require('../models/users')

const addUser = async (req, res, next) => {
    const { email, userName, password ,repassword} = req.body

    const newUser = new User({
        email: email,
        userName: userName,
        password: password,
        repassword: repassword
        
    })
    const duplicateEmail = await User.findOne({ email });
    const duplicateUser = await User.findOne({ userName });
    if(duplicateEmail){
        return res.status(400).json({status: false, success: 'User with same email already exists!', massage: 'User with same email already exists!'});
    }
    if(duplicateUser){
       return res.status(401).json({status: false, success: 'User with same username already exists!', massage: 'User with same username already exists!'});
    }
    else{
        await newUser.save()
       return res.status(201).json({status: true, success: 'User registered successfully', massage: 'User Created'});
    }

}

exports.addUser = addUser