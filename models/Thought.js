const mongoose = require("mongoose");
const moment = require("moment");

// Define a new schema name `reactionSchema`
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now,
    get: (createdAtTimeStamp) =>
      moment(createdAtTimeStamp).format("MMM DD, YYYY [at] hh:mm a"),
  },
});

// Define a new schema named `thoughtSchema`
const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtTimeStamp) =>
      moment(createdAtTimeStamp).format("MMM DD, YYYY [at] hh:mm a"),
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [ReactionsSchema],
});

module.exports = Thought;

// Reaction:

//reactionId
//// Use Mongoose's ObjectId data type
//// Default value is set to a new ObjectId

// reactionBody
//// String
//// Required
//// 280 character maximum

// username
//// String
//// Required

// createdAt
//// Date
//// Set default value to the current timestamp
//// Use a getter method to format the timestamp on query

// Thought:

// thoughtText
//// String
//// Required
//// Must be between 1 and 280 characters

// createdAt
//// Date
//// Set default value to the current timestamp
//// Use a getter method to format the timestamp on query

// username (The user that created this thought)
//// String
//// Required

// reactions (These are like replies)
//// Array of nested documents created with the reactionSchema

// Schema Settings:
// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

// Reaction (SCHEMA, not a seperate model, goes inside the Thoughts model as a subdocument)
// reactionId
//// Use Mongoose's ObjectId data type
//// Default value is set to a new ObjectId
