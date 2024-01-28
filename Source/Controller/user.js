import dotenv from "dotenv";
dotenv.config();
import UserModel from "../Models/user.js";

// Get All User
const user = async (req, res) => {
  try {
    const user = await UserModel.find();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get User by Id
const userId = async (req, res) => {
 
  try {
   
    const user = await UserModel.findById({_id : req.params.id})
    if (user) {
      res.status(200).send({ message: "Successfully", user: user });
    }
  } catch (error) {
    res.status(500).send(error);
  } finally {
    client.close();
  }
};


// User Create
const userAdd = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      const create = await UserModel.create(req.body);
      res.status(201).send({ message: "User Added Successfully" });
    } else {
      res.status(500).send({
        message: `${req.body.email} already Exits`,
      });
    }
  } catch (error) {
    res.status(500).send({
      messsage: "Failed",
      error : error.message
    });
  }
};


// User Edit
const userEdit = async (req, res) => {
 
  try {
   const user = await UserModel.findById({_id : req.params.id})
    if (user) {
      const edit = await UserModel.updateOne({_id:req.params.id},{$set :req.body})
      res.status(200).send({ message: "Edited Successfully" });
    } else {
      res.status(400).send({
        message: "Invalid Id ",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};



// User Delete
const userDelete = async (req, res) => {
 
  try {
    const user = await UserModel.findById({_id : req.params.id})
    if (user) {
      const del = await UserModel.deleteOne({_id :  req.params.id})
      res.status(200).send({ message: "Deleted Successfully" });
    } else {
      res.status(400).send({
        message: "Invalid Id ",
        
      });
    }
  } catch (error) {
    res.status(500).send({
      message : "Deleted Failed",
      error : error.message
    });
  } 
};

export default { user, userId, userAdd, userDelete, userEdit };
