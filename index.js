/*
TODO - node schedule
npm install node-schedule
schedule the .jar file execution each morning
call mongodb database after .jar file finishes

client side -
add buttons for changing different charts
    -total snowfall & base
    -overnight
    -24 hours

 */

// this calls the .jar file that scrapes data and updates mongodb database
var exec = require('child_process').exec;
var child = exec('java -jar ./WinterBreak.jar',
    function (error, stdout, stderr){
        console.log('Output -> ' + stdout);
        if(error !== null){
            console.log("Error -> "+error);
        }
    });
module.exports = child;




const schedule = require('node-schedule');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const http = require('http');

const port = process.env.PORT || 3000;

//////
// timing stuff
//////

const job = schedule.scheduleJob('* 7 * * *', function() {
    var exec = require('child_process').exec;
    var child = exec('java -jar ./WinterBreak.jar',
        function (error, stdout, stderr){
            console.log('Output -> ' + stdout);
            if(error !== null){
                console.log("Error -> "+error);
            }
        });
    console.log("running scraper");
});

// const server = http.createServer(connectFunction);

const html = fs.readFileSync('test.html');
const js = fs.readFileSync('testScript.js');
const css = fs.readFileSync('style.css');

const app = express()

let snowData;

app.get('/', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html);
})

app.get('/style.css', (req, res) => {
    res.writeHead(200, {'Content-Type': 'text/css'});
    res.end(css);
})

app.get('/testScript.js', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/javascript'});
    res.end(js);
})

app.get('/test', (req, res)=>{
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    // while (snowData == null){
    //     MongoClient.connect(url, function(err, db) {
    //         if (err) throw err;
    //         let dbo = db.db("db");
    //         dbo.collection("coll").findOne({}, function(err, result) {
    //             if (err) throw err;
    //             console.log("json object: %j", result);
    //             snowData = result;
    //             db.close();
    //         });
    //     });
    // }
    res.json(snowData);
})

// testing comments again
app.listen(port, () => console.log('Server ready'))

let url = "mongodb://mveed:BPXalacbVSyTuc7Q5pfSbBjgsj9LdkPS4FAWqA5db9esUs6CRbYoy6D54RSWxIxKWAhcUosmnBD1UuiAJRtNCg==@mveed.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&replicaSet=globaldb&maxIdleTimeMS=120000&appName=@mveed@";
/*
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    let dbo = db.db("db");
    dbo.collection("coll").findOne({}, function(err, result) {
        if (err) throw err;
        console.log("json object: %j", result);
        snowData = result;
        db.close();
    });
});
*/

const job2 = schedule.scheduleJob('5 7 * * *', function() {
    console.log("running db update");
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("db");
        dbo.collection("coll").findOne({}, function(err, result) {
            if (err) throw err;
            console.log("json object: %j", result);
            snowData = result;
            db.close();
        });
    });
});

// function connectFunction(req, res){
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.end(html);
// }
//
// server.listen(port);
//
// router.get('/testScript.js', (req, res, next) => {
//     res.status(200).json({
//         message: 'testing working'
//     });
// });