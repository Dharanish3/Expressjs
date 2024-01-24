import { findIndex } from "./find.js";

const users = [
  {
    id: 1,
    name: "Dharanish",
    email: "dharanishsk9698@gmail.com",
    mobile: 6382617437,
    status: 1,
  },
  {
    id: 2,
    name: "Amar",
    email: "amar@gmail.com",
    mobile: 9876543210,
    status: 2,
  },
];

// Get All User
const user = (req, res) => {
  try {
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};


// Get User by Id
const userId = (req, res) => {
  try {
    let { id } = req.params;
    let index = findIndex(users, id);
    if (index !== -1) {
      res.status(200).send({ message: "Successfully", user: users[index] });
    } else {
      res.status(400).send({
        message: "Invalid User ID",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


// User Create
const userAdd = (req, res) => {
  try {
    console.log(req.body);
    let id = users.length ? users[users.length - 1].id + 1 : 1;
    req.body.id = id;

    users.push(req.body);

    res.status(201).send({ message: "Added Successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};


// User Edit
const userEdit = (req, res) => {
  try {
    let { id } = req.params;
    let index = findIndex(users, id);

    if (index !== -1) {
      req.body.id = Number(id);
      users.splice(index, 1, req.body);
      res.status(200).send({ message: "Edited Successfully" });
    } else {
      res.status(400).send({
        message: "Invalid User ID",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


// User Delete
const userDelete = (req, res) => {
  try {
    let { id } = req.params;

    let index = findIndex(users, id);

    if (index !== -1) {
      users.splice(index, 1);
      res.status(200).send({ message: "Deleted Successfully" });
    } else {
      res.status(400).send({
        message: "Invalid User ID",
      });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};



export default { user, userId, userAdd, userDelete, userEdit };
