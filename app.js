const express = require("express");
const https = require("https")
const bodyparser = require("body-parser");

const app = express();
const posts = [];

app.use(bodyparser.urlencoded({extended:true}));
app.set('view engine',"ejs");
app.use(express.static('public'));

app.get("/",function(req,res){
  res.render("index",{posts:posts})
});

app.post("/",function(req,res){
    const query = req.body.name;
    const url = "https://api.tvmaze.com/singlesearch/shows?q="+query;
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const tvdata = JSON.parse(data);
            const post = {
              name:tvdata.name,
              img:tvdata.image.medium,
              typr:tvdata.type,
              summary:tvdata.summary
            }
            posts.push(post);
        })

    })

})

app.listen(3000,function(){
    console.log("server started on port 3000");
});
