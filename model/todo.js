const debug = require("debug")("perfectstyle:todo");
const mongo = require("mongoose");
const Schema = mongo.Schema;

module.exports = db => {
    let schema = new Schema({text : String});

    // CRUD without the U
    schema.statics.CREATE = async function (str) {
        return this.create({text: str});
    };

    schema.statics.REQUEST = async function(cb) {
        // no arguments - bring all at once
        const args = Array.from(arguments);
        if (args.length === 0) {
            return this.find({}).exec();
        }
        let cursor, todo;
        let asynch = cb.constructor.name === 'AsyncFunction';
        try {
            cursor = await this.find().cursor();
        } catch (err) { throw err; }
        try {
            while (null !== (todo = await cursor.next()))
                if (asynch)
                    try { await cb(todo); } catch (err) { throw err; }
                else
                    cb(todo);
        } catch (err) { throw err; }
    };

    schema.statics.UPDATE = async function(id, str) {
        return this.findByIdAndUpdate(id, {text: str}).exec();
    };

    schema.statics.DELETE = async function(id) {
        return this.findByIdAndRemove(id).exec();
    };

    db.model('ToDo', schema , 'todos');
};
