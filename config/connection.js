const { connect, connection } = require("mongoose");

const connectionString =
  // process.env.MONGODB_URI || "mongodb://localhost/usersDB";
  // process.env.MONGODB_URI || "mongodb://localhost:27017/usersDB";
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/usersDB";
// process.env.MONGODB_URI || "mongodb://0.0.0.0:27017/usersDB";

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
