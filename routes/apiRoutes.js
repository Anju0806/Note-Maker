const fs=require('fs');
const router=require('express').Router();


// GET Route for homepage
router.get('/notes', (req, res) =>
  fs.readFile('db/db.json','utf-8',(err,data)=> err ? console.log(err) : res.json(JSON.parse(data))
  ));



  module.exports=router;