const { ObjectId } = require("mongoose").Types;
const { Users, Thoughts } = require("../models");

module.exports = {
  // GET Get all uers
  getUsers(req, res) {
    Users.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // GET Get a single user
  getSingleUser(req, res) {
    Users.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST Create a new user
  // PUT Update a user by _id
  // DELETE Remove a user by _id
  // delete user's associated thoughts when user is deleted
  // POST Add new friend to user's friend list
  // DELETE Remove a friend from a user's friend list
};

// GET all users.

// GET a single user by its _id and populated thought and friend data.

// Post a new user.

// PUT to update a user by its _id.

// DELETE to remove user by its _id.

// Remove a user's associated thoughts when deleted.

// POST to add a new friend to a user's friend list.

// DELETE to remove a friend from a user's friend list.
