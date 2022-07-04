const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET Get a single thought by _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with that ID!" })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST Create a new thought
  createThought(req, res) {
    Thought.create({
      thoughtText: req.body.thoughtText,
      username: req.body.username,
    })
      .then((thought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Cannot create thought! No user found with that ID!",
            })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // PUT Update a thought by _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        thoughtText: req.body.thoughtText,
        username: req.body.username,
      },
      { new: true },
      (err, thought) => {
        if (thought) {
          res.status(200).json(thought);
        } else {
          console.log(err);
          res.status(500).json({ message: "error", err });
        }
      }
    );
  },

  // DELETE Remove a thought by _id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({
              message: "Cannot delete thought! No thought found with that ID!",
            })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({
              message:
                "Could not delete thought! No thought found with that ID!",
            })
          : res.json({ message: "Thought deleted successfully!" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // POST Create a reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((dbReaction) =>
        !dbReaction
          ? res.status(404).json({
              message: "Could not add reaction! No thought found with that ID!",
            })
          : res.json(dbReaction)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE Remove a reaction by _id
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
      { new: true }
    )
      .then((dbReaction) =>
        !dbReaction
          ? res.status(404).json({
              message:
                "Could not delete reaction! No reaction found with that ID!",
            })
          : res.json("Reaction deleted successfully!")
      )
      .catch((err) => res.status(500).json(err));
  },
};
