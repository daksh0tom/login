var express = require('express');
var router = express.Router();
const bodyParser = require("body-parser");

const https = require("https");

router.use(bodyParser.urlencoded({
  extended:true
}));
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next) {
  
  const fname = req.body.FName;

  const email = req.body.email;
  const MoNumber = req.body.number;

  console.log(fname, email, MoNumber);


  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        FNAME: fname,
        MERGE4: MoNumber

    }
  ]

  };

  const Jasondata = JSON.stringify(data);

  const url = "https://us22.api.mailchimp.com/3.0/lists/6bc7e6a8b4";

  const option = {
    method:"POST",
    auth : "Divesh:370a3abc3ea9e95043fe6ba83431c35b-us22"
  }

 const request = https.request(url, option,function(response){

if(response.statusCode === 200){
  res.render("succes");

}else{
  res.render("failure");
}


response.on("data" , function(data){
  console.log(JSON.parse(data));
})
  })
request.write(Jasondata);
request.end();

});

module.exports = router;

// api id
// 370a3abc3ea9e95043fe6ba83431c35b-us22

//list id 6bc7e6a8b4