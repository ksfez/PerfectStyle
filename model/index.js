const mongo = require("mongoose");

let db = mongo.createConnection();
(async () => {
    try {
        await db.openUri('mongodb://localhost/mydb');
    } catch (err) {
        console.log("Error connecting to DB: " + err);
    }
})();
console.log('Pending DB connection from index model');

require("./todo")(db);
require("./Book")(db);
require("./Shoe")(db);
require("./Store")(db);
require("./User")(db);
require("./message")(db);
require("./chat")(db);
require("./Item")(db);
require("./Cocktail")(db);
require("./Worker")(db);
require("./Casual")(db);
require("./Top")(db);
require("./Accessorie")(db);
require("./Sale")(db);

module.exports = model => db.model(model);
