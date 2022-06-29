const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET Get all uers
  getUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) => res.json({ dbUser }))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // getUsers(req, res) {
  //   User.find({})
  //     // populate users thoughts
  //     .populate({
  //       path: "thoughts",
  //       select: "-__v",
  //     })
  //     // populate user friends
  //     .populate({
  //       path: "friends",
  //       select: "-__v",
  //     })
  //     .select("-__v")
  //     .then((dbUsersData) => res.json(dbUsersData))
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  // getUsers(req, res) {
  //   User.find()
  //     .then(async (dbUser) => {
  //       const userObj = {
  //         dbUser,
  //       };
  //       return res.json(userObj);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  // GET Get a single user: !working
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate("friends")
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json({ dbUser })
      )
      .catch((err) => res.status(500).json(err));
  },

  // getSingleUser(req, res) {
  //   User.findOne({ _id: req.params.userId })
  //     .select("-__v")
  //     .lean()
  //     .then(async (dbUser) =>
  //       !dbUser
  //         ? res.status(404).json({ message: "No user found with that ID!" })
  //         : res.json({ dbUser })
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       return res.status(500).json(err);
  //     });
  // },

  // POST Create a new user
  // createUser(req, res) {
  //   User.create({
  //     username: req.body.username,
  //     email: req.body.email,
  //   })
  //     .then((dbUser) => res.json(dbUser))
  //     .catch((err) => res.status(400).json(err));
  // },

  // createUser({ body }, res) {
  //   User.create(body)
  //     .then((dbUser) => res.json(dbUser))
  //     .catch((err) => res.status(400).json(err));
  // },

  // createUser(req, res) {
  //   User.create(req.body)
  //     .then((user) => res.json(user))
  //     .catch((err) => res.status(500).json(err));
  // },

  createUser(req, res) {
    User.create(req.body)
      .then((student) => res.json(student))
      .catch((err) => res.status(500).json(err));
  },

  // PUT Update a user by _id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { username: req.body.username, email: req.body.email },
      { new: true, runValidators: true }
    )
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(dbUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE Remove a user by _id
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(dbUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  // delete user's associated thoughts when user is deleted

  // POST Add new friend to user's friend list
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(dbUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE Remove a friend from a user's friend list
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .populate({
        path: "friends",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({ message: "No user found with that ID!" })
          : res.json(dbUser)
      )
      .catch((err) => res.status(500).json(err));
  },
};

// GET all users.

// GET a single user by its _id and populated thought and friend data.

// Post a new user.

// PUT to update a user by its _id.

// DELETE to remove user by its _id.

// Remove a user's associated thoughts when deleted.

// POST to add a new friend to a user's friend list.

// DELETE to remove a friend from a user's friend list.
