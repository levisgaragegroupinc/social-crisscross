const router = require("express").Router();

const {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

// api/thoughts
router.route("/").get(getAllThoughts).post(createThought);

// api/thoughts/:thoughtid
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// api/thoughts/:thoughtId/reactions
router.route(".thoughtId/reactions").post(addReaction).delete(deleteReaction);

// GET to get all thoughts.

// GET to get a single thought by its _id.

// POST to create a new thought (and push the created thought's _id to the
// associated user's thoughts array field).

// PUT to update a thought by its _id.

// DELETE to remove a thought by its _id.

// POST to create a reaction stored in a single thought's reactions array field.

// DELETE to pull and remove a reaction by the reaction's reactionID value.

module.exports = router;
