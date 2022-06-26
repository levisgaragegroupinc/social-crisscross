const connection = require("../config/connection");
const { modelname, othermodelname } = require("../models");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
