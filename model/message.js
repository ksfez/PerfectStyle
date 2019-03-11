const mongoose = require('mongoose');

// message schema
const MessageSchema = mongoose.Schema({
  created:{
	type:Date
  },
  date: {
    type: String
  },
  from: {
    type: String,
    required: true
  },
  userId: {
	type: String,
    required: true 
  },
  text: {
    type: String,
    required: true
  },
  chatRoom: {
    type: String,
    required: true
  },
  like: {
	 type: Number	 
  },
  unlike: {
	 type: Number	 
  },
  listUserLike: {
	  type:Array()
  },
  listUserUnlike: {
	  type:Array()
  }
});

MessageSchema.pre('save', function (next) {
   // get the current date
		let currentDate = new Date();
		// change the updated_at field to current date
		let month=currentDate.getMonth()+1
		this.date = currentDate.getDate()+'/'+month+'/'+currentDate.getFullYear();
		this.created=currentDate;
		next();
});

MessageSchema.statics.getMessagesByConv = (id, callback) => {
	console.log("entered in model");
	console.log(id);
   Message.find({chatRoom: id}, callback);
};

MessageSchema.statics.getMessagesByUserId = (id, callback) => {
	console.log("entered in model");
	console.log(id);
   Message.find({userId: id}, callback);
};

MessageSchema.statics.REQUEST = async function() 
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
			let cursor, message;
			try 
			{
				cursor = await this.find(...args).cursor();
			} 
			catch (err) { throw err; }
			try 
			{
				while (null !== (message = await cursor.next())) 
				{
					if (asynch) 
					{
						try 
						{
							await callback(message);
						} catch (err) { throw err; }
					}
					else
						{
						callback(message);
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

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;
