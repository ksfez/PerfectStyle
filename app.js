var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

let session = require('express-session');    // add session management module
let connectMongo = require('connect-mongo'); // add session store implementation for MongoDB

const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todo');

var apiRouter = require('./routes/book');
var shoesRouter = require('./routes/shoes');
var userRouter = require('./routes/user');
var resetPasswordRouter = require('./routes/resetPassword');
var storesRouter = require('./routes/stores');
var messagesRouter = require('./routes/messages');
var chatRouter = require('./routes/chat');
var itemsRouter = require('./routes/items');
var topsRouter = require('./routes/tops');
var cocktailsRouter = require('./routes/cocktails');
var workersRouter = require('./routes/workers');
var casualsRouter = require('./routes/casuals');
var accessoriesRouter = require('./routes/accessories');
var fileRoutes = require('./routes/file');
var salesRouter = require('./routes/sales');

//-------------------------DB + PASSPORT-----------------
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/mydb', { promiseLibrary: require('bluebird') })
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));

//--------------------------------------------------------

  
var app = express();
//--------------------------------SESSION-----------------------
(async () => {
	let MongoStore = connectMongo(session);
    let sessConnStr = "mongodb://127.0.0.1/perfectstyle-sessions";
    let sessionConnect = mongoose.createConnection();
    try {
        await sessionConnect.openUri(sessConnStr);
    } catch (err) {
        console.log(`Error connecting to session backend DB: ${err}`);
        process.exit(0);
    }
    process.on('SIGINT', async () => {
        await sessionConnect.close();
        process.exit(0);
    });
let secret = 'users secret'; // must be the same one for cookie parser and for session
app.use(cookieParser(secret));
 
 app.use(session({
    name:        'users.sid', // the name of session ID cookie
    secret:           secret, // the secret for signing the session ID cookie
    resave:            false, // resave unchanged session? (only if touch does not work)
    saveUninitialized: false, // do we need to save an 'empty' session object?
    rolling:            true, // do we send the session ID cookie with each response?
    store: new MongoStore({ mongooseConnection: sessionConnect }), // session storage backend
    cookie: { maxAge: 900000, httpOnly: true, sameSite: true }  // cookie parameters
    // NB: maxAge is used for session object expiry setting in the storage backend as well
}));
//--------------------------------------------------------


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', express.static(path.join(__dirname, 'spa', 'dist/spa')));

app.use('/shoes', express.static(path.join(__dirname, 'spa', 'dist/spa')), shoesRouter);
app.use('/users', express.static(path.join(__dirname, 'spa', 'dist/spa')), userRouter);
app.use('/api', express.static(path.join(__dirname, 'spa', 'dist/spa')), apiRouter);
app.use('/stores', express.static(path.join(__dirname, 'spa', 'dist/spa')), storesRouter);
app.use('/message', express.static(path.join(__dirname, 'spa', 'dist/spa')), messagesRouter);
app.use('/chat', express.static(path.join(__dirname, 'spa', 'dist/spa')), chatRouter);
app.use('/resetPassword', resetPasswordRouter);
app.use('/tops', express.static(path.join(__dirname, 'spa', 'dist/spa')), topsRouter);
app.use('/casuals', express.static(path.join(__dirname, 'spa', 'dist/spa')), casualsRouter);
app.use('/cocktails', express.static(path.join(__dirname, 'spa', 'dist/spa')), cocktailsRouter);
app.use('/workers', express.static(path.join(__dirname, 'spa', 'dist/spa')), workersRouter);
app.use('/accessories', express.static(path.join(__dirname, 'spa', 'dist/spa')), accessoriesRouter);
app.use('/items', express.static(path.join(__dirname, 'spa', 'dist/spa')), itemsRouter);
app.use('/file', express.static(path.join(__dirname, 'spa', 'dist/spa')), fileRoutes);
app.use('/sales', express.static(path.join(__dirname, 'spa', 'dist/spa')), salesRouter);



//-------------------------DB + PASSPORT-----------------
app.use(passport.initialize());
//--------------------------------------------------------



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});
})()
    .catch(err => { console.log(`Failure: ${err}`); process.exit(0); });
	

module.exports = app;