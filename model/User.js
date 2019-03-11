var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	name: String,
	mail: {
        type: String,
        unique: true,
        required: true
    },
	password: {
        type: String,
        required: true
    },
	role: String,
	branch: Number, //depends on the branches table
	img: String ,
	connected: String,
	created_at: Date,
	updated_at: Date
	
});

UserSchema.statics.CREATE = async function(user) {
        return this.create({
            name: user[0],
            mail: user[1],
            password: user[2],
			role: user[3],
            branch: user[4],
			img: user[5]
        });
    };

UserSchema.pre('save', function (next) {
    var user = this;
	this.connected='false';
	console.log(user);
    if (this.isModified('password') || this.isNew) {
		console.log("entered in if");
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});


UserSchema.statics.UPDATE = async function(id, str) {
		this.DELETE(id);
		return str.save(function(err) {
			console.log(err);
      });
	  
    };
	
UserSchema.statics.DELETE = async function(id) {
        return this.findByIdAndRemove(id).exec();
    };
	
UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
