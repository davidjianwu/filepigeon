const express = require('express');
const router = express.Router();
const randomize = require('randomatic');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
//const credentials = require('../credentials.js')
const fs = require('fs');

//Name of session ID
let key = "";

AWS.config.update({
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET
});

let s3 = new AWS.S3({ signatureVersion: 'v4', region: 'us-east-2' });

let upload = multer({
  //50MB limit
  limits: { fileSize: 2552428800 },
  storage: multerS3({
    s3: s3,
    bucket: 'speedipigeon',
    metadata: function(req, file, cb) {
      //@2nd parameter accepts an object in form of whatitscalled:argument
      cb(null, {fileKey: key});
    },
    key: function(req, file, cb) {
      cb(null, key + '/' + file.originalname);
    }
  })
})

router.get('/generate', (req,res) => {
  key = randomize('aA0',10);
  res.send(key);
});

router.get('/changeSession/:inputKey', (req, res) => {
    key = req.params.inputKey;
    console.log('KEY AFTER CHNAGE =>>>>', key);
    res.send(inputKey);
});

router.get('/:id', (req,res) => {
  let params = {
    Bucket: "speedipigeon",
    Prefix: req.params.id,
    MaxKeys: 1000,
  };
  s3.listObjects(params, (err, data) => {
    let allFiles = [];
    if(err) {
      console.log(err, 'COULD NOT LIST');
    }
    else {
      for(let index in data.Contents) {
        allFiles.push(data.Contents[index]);
      }
    }
    //console.log('THIS IS THE ARRAY', allFiles);
    res.json(allFiles);
  });
});

router.post('/upload',upload.any(), (req, res) => {
  res.send('Sucessfully uploaded');
});

router.get('/file/:fileName/:originalName', (req, res) => {
  let keyfile = req.params.fileName + '/' + req.params.originalName;
  console.log('KEY BEING PASSEDIN TO ROUTE======', keyfile);
  let params = {
    Bucket: "speedipigeon",
    Key: keyfile,
  }
  res.attachment(keyfile);
  s3.getObject(params).createReadStream().pipe(res);
  console.log('SHOULD BE DOWNLAODED BY NOW');
});


module.exports = router;
