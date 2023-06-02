const fs=require('fs');
const router=require('express').Router();
const express = require('express');
const app = express();

// GET Route for homepage
router.get('/notes', (req, res) =>
  fs.readFile('db/db.json','utf-8',(err,data)=> err ? console.log(err) : res.json(JSON.parse(data))
  ));


 
  // Start the server
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
  
  



  module.exports=router;