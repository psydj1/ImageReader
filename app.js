const xmpReader = require('xmp-reader');
var express = require("express");
var app = express();
var multer = require('multer');
var path = require('path'),
    fs = require('fs');



//so will need a method to make directories s
//function to check directory exists 
//save file 

//read file one by one from the upload
//alternative method to read all images from a folder in a loop 

//can also display the image after uploading

//add tests

function readXmp(File file) {
    xmpReader.fromFile(File file, (err, data) => {
        if (err)
            console.log(err);
        else
            console.log(data)
    });

}



app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/api/photo', function(req, res) {
    // upload(req, res, function(err) {
    //     if (err) {
    //         res.end("Error uploading file\n");
    //         console.log(err);
    //         return
    //     }
    //     res.end("File is uploaded");
    // });
    //test if i can even pass an upload file to the parser method
    readXmp(req);
});

var storage = multer.diskStorage({
    destination: function(req, file, callback) {

        //tst up to here if can send file to the xmp parser 
        var type = req.params.type;
        var path = './uploads/${type}';
        ensureDirectoryExistence(path);
        callback(null, path);
    },
    filename: function(req, file, callback) {
        // callback(null, file.fieldname + '-' + Date.now());
        callback(null, file.fieldname);
    }
});
var upload = multer({ storage: storage }).single('userPhoto');



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
