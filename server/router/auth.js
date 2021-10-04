const express = require('express');
const bcrypt = require('bcryptjs')
const router = express.Router();
const jwt = require('jsonwebtoken')
require('../db/conn')
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send("Hello from server router");
})

//using promises
// router.post('/register',  (req, res) =>{

//     const {name, email, phone, password, cpassword} = req.body;

//     //console.log(name)
//     if(!name || !email || !phone || !w !password || !cpassword){
//         return res.status(422).json({err:" pls fill field"})
//     }

//     // console.log(req.body);
//     // res.json({message:req.body});
//     User.findOne({email:email})
    
//     .then((userExists) => {
//         if(userExists){
//             return res.status(422).json({ error: " email already exists"});
//         }
//         const user = new User({name, email, phone, password, cpassword})

//         user.save().then(()=> {
//             res.status(201).json({ message : "user registered"})
//         }).catch((err) => res.status(500).json({ err: "failed to registered"}));
//     }).catch((err) => {console.log(err)});
// });

router.post('/signup', async (req, res) =>{

    const {name, email, phone, password, cpassword} = req.body;

    //console.log(name)
    if(!name || !email || !phone ||  !password || !cpassword){
        return res.status(422).json({err:" pls fill field"})
    }

    try{
        const userExists = await User.findOne({email:email})
    
        if(userExists){
            return res.status(422).json({ error: " email already exists"});
        } else if(password !== cpassword){
            return res.status(422).json({ error: " password not matching"});
        } else {
            const user = new User({name, email, phone, password, cpassword});

            //hashing pwd
            await user.save();

            res.status(201).json({ message: " user registered successfully"});
        }
        
    }catch(err){
        console.log(err)
    }
    
});

//login route

router.post('/login', async (req, res) =>{
    // console.log(req.body);
    // res.json({message:"awesome"});

    try{
        let token;
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message : "pls fill data"})
        }

        const userLogin = await User.findOne({email: email});

        if(userLogin){

            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();

            res.cookie("jwtoken", token, {
                expires:new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if(!isMatch){
                res.status(200).json({error: "Invalid credentials"});
            }else {
                res.json({message: "user signin successfully"});
            }
        } else{
            res.status(200).json({error: "Invalid credentials"});
        }

        //await user.save();  

    } catch(err){
        console.log(err)
    }
})

module.exports = router;