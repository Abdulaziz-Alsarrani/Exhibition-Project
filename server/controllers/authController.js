const User = require("../models/user")
const jwtHelpers = require("../utils/jwtHelpers")
const bcrypt = require("bcrypt")


exports.login = async (req, res) => {
    const {email, password} = req.body;
 
    try{
        const user = await User.findOne({email})

     if(!user) {
        return  res.status(401).json({message: 'password or email is not correct'})
     }

     const authSuccess = await bcrypt.compare(password , user.password);
     if(!authSuccess){
        return  res.status(401).json({message: 'password or email is not correct'})
     }

     const token = jwtHelpers.sign({ sub: user.id });
     res.status(200).json({
        success: true,
        data: {
            id: user.id,
            name: user.name,
            accessToken: token
        }
    })
    } catch (e) {
        console.error(e)
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.register = async (req, res) => {
    const {name , email , password} = req.body;
    
    try{
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 8); 
        const user =  User({
            name,
            email,
            password: hashedPassword
        })

        await user.save();
        const token = jwtHelpers.sign({ sub: user.id });

        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                name: user.name,
                accessToken: token
            }
        });
    } catch (e) {
        res.status(500).json({
            message: 'Something want wrong'
        })
    }
}

exports.me = async (req, res) => {
    const user = await User.findById(req.userId)
    res.json({
        success: true,
        data:{
            id: user.id,
            name: user.name,
            email: user.email
        }
    })
}