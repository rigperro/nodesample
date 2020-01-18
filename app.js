const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes');
const app = express();
const mongoose = require('mongoose');

// Connect to mongodb
mongoose.connect('mongodb://mongo:27017/db', {useUnifiedTopology: true, useNewUrlParser: true});
var db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to DB")
});
mongoose.set('useFindAndModify', false);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', router);

// Handle unhandled rejections
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});


// Listen to port 3000 for API connections
let port = 3000;
app.listen(port, () => {
  console.log('Listening on port 3000')
})
