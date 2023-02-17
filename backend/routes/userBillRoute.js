const express = require("express");
const router = express.Router();
const UserBill = require("../models/userBills_model");
const auth = require("../middlewares/auth");

//route for insert userCalculation
router.post("/userBill", auth, async (req, res) => {
  try {
    const {
      consume_units,
      month,
      year,
      total_price,
      selected_slab,
  
    } = req.body;

    const previous_data = await UserBill.findOne({
      userId: req.userid,
      month: month,
      year: year
    });
    if (previous_data) {
      res
        .status(400)
        .json({ message: "Provided data for calculation is already exist" });
    } else {
      const newBill = new UserBill({
        userId: req.userid,
        consume_units,
        month,
        year,
        total_price,
        selected_slab,
        
      });
      const createBill = await newBill.save();
      res.status(201).json(createBill);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//route to delete calculation
router.delete("/delUserBill", auth, async (req, res) => {
  try {
    const { _id } = req.body;    
    const data = await UserBill.deleteOne({ _id,userId:req.userid });
    res.status(201).json({ message: "Item deleted", data });
  } catch (error) {
    res.status(500).json(error);
  }
});


//route to fetch calculation
router.get("/getUserBill", auth, async (req, res) => {
  try {
    const data = await UserBill.find({ userId: req.userid });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});


//route to update calculation
router.put("/updateUserBill", auth, async (req, res) => {
  try {
    const { _id, consume_units, month, year, selected_slab,total_price } = req.body;
    const exist_data=await UserBill.find({userId:req.userid,month:month,year:year,consume_units});
    if(exist_data.length>0){
      res.status(400).json({maessage:"Cannot be update provided data already exist"});
    }
    else{      
      const data = await UserBill.updateOne(
        { _id: _id, userId: req.userid },
        {
          $set: {
            consume_units: consume_units,
            month: month,
            year: year,
            selected_slab: selected_slab,
            total_price:total_price
          },
        }
        );
        res.status(201).json(data);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
