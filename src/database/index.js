const mongoose = require('mongoose');

const MONGODB_URI = "mongodb://localhost:27017/webcrawler";
const MONGODB_USER = "";
const MONGODB_PASS = "";
/*
const MONGODB_URI = "mongodb://localhost:27017/webcrawler?authSource=admin";
const MONGODB_USER = "jumplabel";
const MONGODB_PASS = "jumplabel1q2w3e";
*/
const authData =  {
    "user": MONGODB_USER,
    "pass": MONGODB_PASS,
    "useNewUrlParser": true,
    "useCreateIndex": true
};

mongoose.connect(
    MONGODB_URI,
    authData,
    (err) => {
        if (!err) { console.log('MongoDB connection succeeded.'); }
        else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
    }
);

mongoose.Promise = global.Promise;

module.exports = mongoose;