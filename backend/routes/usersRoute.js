const express = require("express");
const router = express.Router();
const User = require("../models/user_model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/auth");

//register a user
router.post("/register", async (req, res) => {
  try {
    //Check existing user
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      res.status(400).json("User already exist");
    } else {
      //hased password
      const salt = await bcrypt.genSalt(10);
      const hasedPassword = await bcrypt.hash(req.body.password, salt);
      //new user
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: hasedPassword,
      });
      const user = await newUser.save();
      res.status(200).json(user._id);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});



//Login a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check existing user
    const userExist = await User.findOne({ email });
    if (!userExist) {
      res.status(404).json("User not found");
    } else {
      //Compare password
      const matchPassword = await bcrypt.compare(password, userExist.password);
      if (!matchPassword) {
        res.status(404).json("Wrong credentials");
      } else {
        const token = jwt.sign(
          { email: userExist.email, id: userExist._id },
          process.env.SECRET_KEY
        );
        res.status(201).json({ user: userExist, token });
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/check",auth,async(req,res)=>{
    res.status(200).json({user:req.userid,message:"authorized user"});
})

module.exports = router;
