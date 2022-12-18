const express = require("express");
const router = express.Router();
// const Post = require("../models/shipper");
const User = require("../models/user");
const db = require("../models")

// get all todos
// router.get("/all", async(req, res) => {
//   const post = await db.Post.findAll({
//     include : [{
//       model : db.User,
//       // as:'user',
//       attributes: {
//        exclude: ['id'],
//   }}]
//   })
//   res.status(200).json({post})
// });

// get single todo by id
router.get("/find/:id", (req, res) => {
  db.Todo.findAll({
    where: {
      id: req.params.id
    }
  }).then(todo => res.send(todo));
});

// post new todo
router.post("/new", async(req, res) => {
  const user = await db.User.create({
    username: req.body.username,
  })
  res.status(200).json({user})
});

// delete todo
router.delete("/delete/:id", (req, res) => {
  db.Todo.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo
router.put("/edit", (req, res) => {
  db.Todo.update(
    {
      text: req.body.text
    },
    {
      where: { id: req.body.id }
    }
  ).then(() => res.send("success"));
});

module.exports = router;
