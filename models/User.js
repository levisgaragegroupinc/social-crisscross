const { Schema, model } = require("mongoose");
// Validate email
var validateEmail = (email) => {
  let emailRegex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return emailRegex.test(email);
};

// Define a new schema named `userSchema`
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validateEmail, "Please fill in a valid email address!"],
    match: [
      /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
      "Please fill in a valid email address!",
    ],
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thoughts",
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
});

userSchema.virtual("friendCount").get(() => {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;

// User:

// username
//// String
//// Unique
//// Required
//// Trimmed

// email
//// String
//// Required
//// Unique
//// Must match a valid email address (look into Mongoose's matching validation)

// thoughts
//// Array of _id values referencing the Thought model

// friends
//// Array of _id values referencing the User model (self-reference)

// Schema Settings:
//// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
