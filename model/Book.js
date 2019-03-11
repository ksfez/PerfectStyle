const debug = require("debug")("perfectstyle:book");
const mongo = require("mongoose");
const Schema = mongo.Schema;

module.exports = db => {
    let schema = new Schema({
        isbn: String,
        title: String,
        author: String,
        description: String,
        published_year: String,
        publisher: String,
        price: Number,
        updated_at: { type: Date, default: Date.now },
    });

    // CRUD without the U
    schema.statics.CREATE = async function (str) {
        return this.create(str);
    };

    schema.statics.REQUEST = async function() {
        // no arguments - bring all at once
        const args = [...arguments];
        if (args.length === 0) {
            return this.find({}).exec();
        }

        let cb = arguments[arguments.length - 1];
        if (cb instanceof Function) {
            args.pop();
            let cursor, book;
            let asynch = cb.constructor.name === 'AsyncFunction';
            try {
                cursor = await this.find().cursor();
            } catch (err) {
                throw err;
            }
            try {
                while (null !== (book = await cursor.next()))
                    if (asynch)
                        try {
                            await cb(book);
                        } catch (err) {
                            throw err;
                        }
                    else
                        cb(book);
            } catch (err) {
                throw err;
            }
            return;
        }

        // request by id as a hexadecimal string
        if (args.length === 1 && typeof args[0] === "string") {
            debug("request: by ID");
            return this.findById(args[0]).exec();
        }

        // There is no callback - bring requested at once
        debug(`request: without callback: ${JSON.stringify(args)}`);
        return this.find(...args).exec();
    };

    schema.statics.UPDATE = async function(id, str) {
        return this.findByIdAndUpdate(id, str).exec();
    };

    schema.statics.DELETE = async function(id) {
        return this.findByIdAndRemove(id).exec();
    };

    db.model('Book', schema , 'books');
};
