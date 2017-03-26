const xmpReader = require('xmp-reader');
var express = require("express");
var app = express();
var multer = require('multer');
var path = require('path'),
    fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

path = require('path')


function readXmp(file) {

    xmpReader.fromFile(file, (err, data) => {
        if (err)
            console.log(err);
        else
            console.log(data)
    });
};

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            res.end("Error uploading file\n");
            console.log(err);
            return
        }
        res.end("File is uploaded to temp");

        //here now can using file name access the file in that folder
        console.log(req.file.originalname);

        

    });

});

var funcdata = multer.diskStorage({
    destination: function(req, file, callback) {
        console.log(__dirname);
        var path = __dirname + '/uploads/temp/';        
        console.log(path);
        callback(null, path);

    },
    filename: function(req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        callback(null, file.originalname);
    }
});

var upload = multer({
    storage: funcdata
}).single('userPhoto');




function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}



app.listen(3000, function() {
    console.log("Working on port 3000");
});
