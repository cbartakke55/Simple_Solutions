const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');
const upload = require("./services/file-upload");

/* set storage engine 
const storage = multer.diskStorage({
    destination: '/public/uploads',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({
    storage: storage
}).single('myImage');*/


// Initialize node app
const app = express();

// EJS
app.set('view engine','ejs');

// public folder 
app.use(express.static('./public'));

// render template for index
app.get('/', (req, res) => res.render('index'));

// port on which node app will run
const port = 3000;

// aws s3 file upload
app.post('/upload', upload.single('myImage'), function(req, res, next) {
    res.render('index',{
        msg: 'File Uploaded Sucessfully!!'
    });
  });

// listening to port 3000
app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
});