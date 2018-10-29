const express = require('express');
const router = express.Router();
const randomize = require('randomatic');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const credentials = require('../credentials.js')

let key = "";

AWS.config.update({
  accessKeyId: credentials.aws_s3_access,
  secretAccessKey: credentials.aws_s3_secret
});

let s3 = new AWS.S3({});

let upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'speedipigeon',
    metadata: function(req, file, cb) {
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

router.get('/:fileKey', (req,res) => {
  let params = {
    Bucket: "speedipigeon",

  };
  s3.getObject()

});

router.post('/upload',upload.any(), (req, res) => {
  res.send('Sucessfully uploaded');
});


module.exports = router;
