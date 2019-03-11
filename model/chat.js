const mongoose = require('mongoose');

// chat schema
const ChatSchema = mongoose.Schema({
  created: {
    type: String
  },
  name: {
    type: String,
    required: true,
	unique: true
  },
  admin: {
    type: String,
    required: true
  },
  adminId: {
	type: String,
    required: true 
  },
  listUsers:{
	type: Array	
  }
});


ChatSchema.pre('save', function (next) {
   // get the current date
		let currentDate = new Date();
		// change the updated_at field to current date
		this.created = currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear();
		next();
});

ChatSchema.statics.REQUEST = async function() 
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
			let cursor, chat;
			try 
			{
				cursor = await this.find(...args).cursor();
			} 
			catch (err) { throw err; }
			try 
			{
				while (null !== (chat = await cursor.next())) 
				{
					if (asynch) 
					{
						try 
						{
							await callback(chat);
						} catch (err) { throw err; }
					}
					else
						{
						callback(chat);
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

const Chat = mongoose.model('Chat', ChatSchema);
module.exports = Chat;
