const debug = require("debug")("mongo:model");
const Flower = require('./model')('Message');
const prompt = require('./prompt');
let mongo = require("mongoose");
(async () => {
  try {
      let db = await mongo.createConnection('mongodb://localhost/lab-mongo-5778');
	  await Flower.deleteMany();
	  
      logandexit('All the flowers were deleted');
  } catch (err) {
      logandexit("Failed: " + err);
  }
})();
function logandexit(str) {
    console.log(str);
    process.exit(0);
}