const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

module.exports = {
  // GET Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((dbThought) => res.json(dbThought))
      .catch((err) => res.status(500).json(err));
  },

  // GET Get a single thought by _id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .populate("reactions")
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({ message: "No thought found with that ID!" })
          : res.json(dbThought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST Create a new thought
  createThought(req, res) {
    Thought.create({
      ThoughtText: req.body.thoughtText,
      username: req.body.username,
    })
      .then((dbThought) => {
        return User.findOneAndUpdate(
          { username: req.body.username },
          { $addToSet: { thought: dbThought._id } },
          { new: true }
        );
      })
      .then((dbUser) =>
        !dbUser
          ? res.status(404).json({
              message: "Cannot create thought! No user found with that ID!",
            })
          : res.json(dbUser)
      )
      .catch((err) => res.status(500).json(err));
  },

  // PUT Update a thought by _id
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { thoughtText: req.body.thoughtText, username: req.body.username },
      { new: true }
    )
      .then((dbThought) =>
        !dbThought
          ? res.status(404).json({
              message: "Cannot update thought!. No thought found with that ID!",
            })
          : res.json(dbThought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // DELETE Remove a thought by _id
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThought) =>
        !thought
          ? res
              .status(404)
              .json({
                message:
                  "Cannot delete thought! No thought found with that ID!",
              })
          : User.findOneAndUpdate(
              { thought: req.params.thoughtId },
              { $pull: { thought: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((dbUser) =>
        !dbUser
          ? res
              .status(404)
              .json({
                message:
                  "Could not delete thought! No thought found with that ID!",
              })
          : res.json({ message: "Thought deleted successfully!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST Create a reaction
  // DELETE Remove a reaction by _id
};

// GET to get all thoughts.

// GET to get a single thought by its _id.

// POST to create a new thought (and push the created thought's _id to the
// associated user's thoughts array field).

// PUT to update a thought by its _id.

// DELETE to remove a thought by its _id.

// POST to create a reaction stored in a single thought's reactions array field.

// DELETE to pull and remove a reaction by the reaction's reactionID value.
