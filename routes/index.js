'use strict'
var express = require('express');
var router = express.Router();
const transdata=require("../util/getExpressTrans.js");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index",{
    title:"快递可视化"
  });
});
router.get('/getExpressNumber',(req,res)=>{
 let expressNumber = req.query.EN;
 if(!expressNumber){
   res.json({error:"请输入快递单号"});
 }else{
 transdata(expressNumber,(data)=>{
   res.json(data);
 });
 }
});

module.exports = router;
