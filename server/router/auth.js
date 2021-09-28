const express = require('express');

const router = express.Router();

require('../db/conn')
const User = require('../model/userSchema');

router.get('/', (req, res) => {
    res.send("Hello from server router");
})

//using promises
// router.post('/register',  (req, res) =>{

//     const {name, email, phone, work, password, cpassword} = req.body;

//     //console.log(name)
//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({err:" pls fill field"})
//     }

//     // console.log(req.body);
//     // res.json({message:req.body});
//     User.findOne({email:email})
    
//     .then((userExists) => {
//         if(userExists){
//             return res.status(422).json({ error: " email already exists"});
//         }
//         const user = new User({name, email, phone, work, password, cpassword})

//         user.save().then(()=> {
//             res.status(201).json({ message : "user registered"})
//         }).catch((err) => res.status(500).json({ err: "failed to registered"}));
//     }).catch((err) => {console.log(err)});
// });

router.post('/register', async (req, res) =>{

    const {name, email, phone, work, password, cpassword} = req.body;

    //console.log(name)
    if(!name || !email || !phone || !work || !password || !cpassword){
        return res.status(422).json({err:" pls fill field"})
    }

    try{
        const userExists = await User.findOne({email:email})
    
        if(userExists){
            return res.status(422).json({ error: " email already exists"});
        }

        const user = new User({name, email, phone, work, password, cpassword})

        const userRegistered = await user.save();

        if(userRegistered){
            res.status(201).json({ message : "user registered"})
        }
        

    }catch(err){
        console.log(err)
    }

    // console.log(req.body);
    // res.json({message:req.body});
    X
});

module.exports = router;