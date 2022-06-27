const connection = require("../config/connection");
const { Users, Thoughts } = require("../models");

connection.on("error", (err) => err);

const usersSeeds = [
  {
    username: "Dale",
    email: "dale@gmail.com",
  },
  {
    username: "Roger",
    email: "roger@gmail.com",
  },
  {
    username: "Lora",
    email: "lora@gmail.com",
  },
];

connection.once("open", async () => {
  console.log("connected");

  // Drop existing
  await Thoughts.deleteMany({});

  //Drip existing
  await Users.deleteMany({});

  await Users.collection.insertMany(usersSeeds);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
