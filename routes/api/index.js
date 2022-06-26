const router = require("express").Router();
const nameofroute = require("./nameoffileroute");
const nameofotherroute = require("./nameofotherfileroute");

router.use("/nameofroute", nameofroute);
router.use("/nameofotherroute", nameofotherroute);

module.exports = router;
