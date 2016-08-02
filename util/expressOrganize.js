const bosonnlp = require('bosonnlp');
const config = require('../config.js');
const nlp = new bosonnlp.BosonNLP(config.fenciAPIKey);

module.exports=(JSONData)=>{

}
nlp.ner('快件离开【深圳福田上步大厦营业部】,正发往 【深圳彩田集散中心】', function (result) {
	console.log(result);
});
//[{"tag": ["ns", "n", "n", "nr"],
//  "word": ["\u6210\u90fd", "\u5546\u62a5", "\u8bb0\u8005", "\u59da\u6c38\u5fe0"],
//  "entity": [[0, 2, "product_name"], [3, 4, "person_name"]]}]
