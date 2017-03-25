const xmpReader = require('xmp-reader');


//so will need a method to make directories 
//function to check directory exists 
//save file 

//read file one by one from the upload
//alternative method to read all images from a folder in a loop 

//can also display the image after uploading

//add tests

xmpReader.fromFile('TestImages/test1.jpg', (err, data) => {
    if (err)
        console.log(err);
    else
        console.log(data)
});

