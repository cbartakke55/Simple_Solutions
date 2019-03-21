const aws = require('aws-sdk');
const express = require('express');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

aws.config.update({
    accessKeyId: 'AKIAIQVMOBTFRJVSEEWA',
    secretAccessKey: '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',
    region:'ap-south-1'
});
 
const app = express();
const s3 = new aws.S3();
 
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'simple-solutions',
    /*fileFilter: function(req, file, cb){
        checkFileType(file, cb)
    },*/
    metadata: function (req, file, cb) {
      cb(null, {fieldName: 'Simple_Solutions_S3_File_Upload'});
    },
    key: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now().toString() + path.extname(file.originalname));
    }
  })
});

/*function checkFileType(file, cb)
{
    // allowed extensions
    const filetypes = /jpeg|jpg|png|gif/;

    // check file extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    //check mimetype
    //const mimetype = filetypes.test(file.mimetype);

    //check if both are true
    if(extname)
    {
        return cb(null,true);
    }
    else
    {
        cb('Error : Images Only!');
    }

}*/

module.exports = upload;


// note you can use limits for upload like filesize,..