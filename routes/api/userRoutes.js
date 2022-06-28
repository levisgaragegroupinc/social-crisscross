const router = require("express").Router();

const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");

// api/users
router.route("/").get(getUsers).post(createUser);

// api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// api/users/:userId/friends/friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

// GET all users.

// GET a single user by its _id and populated thought and friend data.

// Post a new user.

// PUT to update a user by its _id.

// DELETE to remove user by its _id.

// Remove a user's associated thoughts when deleted.

// POST to add a new friend to a user's friend list.

// DELETE to remove a friend from a user's friend list.

module.exports = router;
