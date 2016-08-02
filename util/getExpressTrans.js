'use strict'
const config = require("../config.js");
const http=require("./request.js");
const URL = require("url");
module.exports=function(expressNumber,cb){

    let autoJudgeURL = config.expressAPI.autoJudge;
    //TODO:对快递单号正误的判断
    autoJudgeURL += expressNumber;
    http.get(autoJudgeURL,(data)=>{

      let parsed = JSON.parse(data);
      let comCode=parsed[0].comCode;
      console.log("公司代码"+comCode);
      let transURL=config.expressAPI.trans+'/query?type='+comCode+'&postid='+expressNumber;
       http.get(transURL,(data)=>{
         let JSONdata=JSON.parse(data);
         console.log(data);
         //console.log(JSONdata.status==201);
         if (JSONdata.status!=200) {
           console.log("此快递单号不存在!");
         }else {
           let dataSet=new Set();
           JSONdata.data.forEach((value)=>{
             let data = value.context.match(/【(.*?)】/g)

             if(data!=null){
               data.map(x => dataSet.add(x));
             }
           });
           let dataArray = [];
           dataSet.forEach((k,v)=>{
            dataArray.push(v);
           });
           dataArray.reverse();
           cb(dataArray);
         }
       });
    });
}
