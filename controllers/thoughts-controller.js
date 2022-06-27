const { ObjectId } = require("mongoose").Types;
const { Users, Thoughts } = require("../models");

module.exports = {
  // GET Get all thoughts
  // GET Get a single thought by _id
  // POST Create a new thought
  // PUT Update a thought by _id
  // DELETE Remove a thought by _id
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
