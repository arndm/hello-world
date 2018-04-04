/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
var mongodb = require('mongodb');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var fs   =  require('fs');
var app = express();
var bodyParser =  require("body-parser");

var MongoClient = mongodb.MongoClient;
app.use(express.static('public'));

var url = 'mongodb://db2admin:db2admin@ds019936.mlab.com:19936/dbapp_arindam';
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/public" + "/form4.html" );
})

app.post('/login',function(req,res){

  var user_name=req.body.first_name;
  var last_name=req.body.last_name;
  console.log("User name = "+user_name+", last_name is "+last_name);
  var inc_body_json = JSON.stringify(req.body);
  res.end(user_name + last_name);

/*  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var hour =  dateObj.getHours();
  var min =  dateObj.getMinutes();
  var sec = dateObj.getSeconds();

  var timestamp = year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
  console.log(timestamp);

  var printText = timestamp + ':' + '  ' + user_name  + ' ' + last_name + "\n" ;
  console.log(printText);


  fs.appendFile('upd_log.txt',printText,function(err) {
    if (err) throw 'error writing file: ' + err;
        /*fs.close(fd, function() {
            console.log('file written');
        });
    }); */


      /* MongDb portion */
      MongoClient.connect(url, function (err, db) {
        if (err) {
          console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
          //HURRAY!! We are connected.
          console.log('Connection established to', url);
      }
          // do some work here with the database.

          var collection = db.collection('User_Data');

          //Create some users
          var user1 = {First_name: user_name, Last_name: last_name};

          //Insert user1
          collection.insert(user1, function (err, result) {
            if (err) {
              console.log(err);
            } else {
              console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
          });
          //Close connection
          db.close();

      });



});

// serve the files out of ./public as our main files
//app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port || 3000, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
