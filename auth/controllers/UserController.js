const User = require('../models/User');
const jwt = require('jsonwebtoken');

let register = async (req, res) => {
    const { name, email, password } = await req.body;

    const user = await User.findOne({email});

    if(user) {
        res.status(201).json({
            data: `User already exists with this email ${email}`
        });
    }else{
        const newUser = new User({ name, email, password });
        try {
            let request = await newUser.save();
            if(request) res.status(200).json(newUser);
        } catch (error) {
            if(error) console.error(error);
        }
    }

}

let login = async (req, res) => {
    const { email, password } = await req.body;

    const user = await User.findOne({email});

    if(!user) {
        res.status(201).json({
            data: `User not exists with this email ${email}`
        });
    }else{
        if (password !== user.password) {
            return res.json({ data: { message: `Incorrect Password` } });
        }
        const payload = {
            email,
            name: user.name
        }
        jwt.sign(payload, 'eyalogroup', (err, token) => {
            if(err) res.json({ data: {error: err} });
            return res.json({ token: token });
        })
        // const newUser = new User({ email, password });
        // try {
        //     let request = await newUser.save();
        //     if(request) res.status(200).json(newUser);
        // } catch (error) {
        //     if(error) console.error(error);
        // }
    }

}
module.exports = {
    register,
    login
}