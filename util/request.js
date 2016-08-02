'use strict'
const http = require('http');
const HTTP={};
process.on('uncaughtException', function (err) {
    console.log(err);
});
HTTP.get=(url,callback)=>{
  http.get(url, function(response) {
      // Continuously update stream with data
      let body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {
        callback(body);
      });

  });

}



module.exports=HTTP;
