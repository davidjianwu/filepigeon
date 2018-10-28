const express = require('express');
const router = express.Router();
const randomize = require('randomatic');

/* GET home page. */

router.get('/generate', (req,res) => {
  let key = randomize('aA0',10);
  res.send(key);
});

router.get('/:key', (req,res) => {
  //display database files for this key
});





module.exports = router;
