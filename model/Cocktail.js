const debug = require("debug")("perfectstyle:book");
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CocktailSchema = new Schema({
	id: String,
	name: String,
	color: String,
	price: String,
	img: String,
	created_at: Date,
	updated_at: Date
});


CocktailSchema.pre('save', function (next) {
   // get the current date
		let currentDate = new Date();
		// change the updated_at field to current date
		this.updated_at = currentDate;
		// if created_at doesn't exist, add to that field
		if (!this.created_at)
			this.created_at = currentDate;
		next();
});

CocktailSchema.statics.REQUEST = async function() 
	{
		// no arguments - bring all at once
		const args = Array.from(arguments);
		if (arguments.length === 0) {
			debug("request: no arguments - bring all at once")
			return this.find({}).exec();
		}
		// perhaps last argument is a callback for every document
		let callback = arguments[arguments.length - 1];
		if (callback instanceof Function) 
		{
			let asynch = callback.constructor.name === 'AsyncFunction';
			args.pop();
			let cursor, cocktail;
			try 
			{
				cursor = await this.find(...args).cursor();
			} 
			catch (err) { throw err; }
			try 
			{
				while (null !== (cocktail = await cursor.next())) 
				{
					if (asynch) 
					{
						try 
						{
							await callback(cocktail);
						} catch (err) { throw err; }
					}
					else
						{
						callback(cocktail);
						}
				}
			} 
			catch (err) { throw err; }
        return;
    }
    // request by id as a hexadecimal string
    if (args.length === 1 && typeof args === "string") {
        debug("request: by ID");
        return this.findById(args[0]).exec();
    }
    // There is no callback - bring requested at once
    debug(`request: without callback: ${JSON.stringify(args)}`);
    return this.find(...args).exec();
	}

module.exports = mongoose.model('Cocktail', CocktailSchema);
