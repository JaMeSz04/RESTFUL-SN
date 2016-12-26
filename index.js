

var express = require('express');
var mongoose = require('mongoose');
var app = express();

console.log("connecting to db...");
mongoose.connect('mongodb://localhost/SN_DB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("connected to snDB");
});

var MachineSchema = mongoose.Schema({ 
    mNum: Number,
    Employee : { empName : String },
    mCapacity : Number,
    mWorkTime : Number,
    midleTime : Number,
    misWorking : Boolean

});

var Machine = mongoose.model('machine', MachineSchema);
var machine = new Machine( {"Machine" : [{mNum : 0, Employee : { empName : "ShubU" }, mCapacity : 555, mWorkTime : 300, midleTime : 100, misWorking : true}]});



app.post('/machineList', function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    var val = machine.find( { "MachineNum" : { $exists : true } } );
    console.log("Queried : " + val);
});



app.listen(3000, "192.168.1.176");