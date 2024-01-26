import { findIndex } from "./find.js";
import DB from "../DB/database.js";
import mongodb, { MongoClient } from "mongodb";

const client = new MongoClient(DB.DB_URL); // Connection URL

const dbName = DB.DB_name; // Database Name

const users = [];

// Get All User
const user = async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    const user = await db.collection("user").find().toArray();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    client.close();
  }
};

// Get User by Id
const userId = async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    const user = await db
      .collection("user")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
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
  await client.connect();
  try {
    const db = await client.db(dbName);
    const user = await db.collection("user").findOne({ email: req.body.email });
    if (!user) {
      const create = await db.collection("user").insertOne(req.body);
      res.status(201).send({ message: "User Added Successfully" });
    } else {
      res.status(500).send({
        message: `${req.body.email} already Exits`,
      });
    }
  } catch (error) {
    res.status(500).send(error);
  } finally {
    client.close();
  }
};

// User Edit
const userEdit = async (req, res) => {
  await client.connect();
  try {
    const db = await client.db(dbName);
    const user = await db
      .collection("user")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (user) {
      const edit = await db
        .collection("user")
        .updateOne(
          { _id: new mongodb.ObjectId(req.params.id) },
          { $set: req.body }
        );
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
  await client.connect();
  try {
    const db = await client.db(dbName);
    const user = await db
      .collection("user")
      .findOne({ _id: new mongodb.ObjectId(req.params.id) });
    if (user) {
      const del = await db
        .collection("user")
        .deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
      res.status(200).send({ message: "Deleted Successfully" });
    } else {
      res.status(400).send({
        message: "Invalid Id ",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  } finally {
    client.close();
  }
};

export default { user, userId, userAdd, userDelete, userEdit };
