const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
let glob;

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
        res.sendFile( __dirname + "/index.html" );
})
app.post("/",function(req , res){
    
    console.log(res.statusCode);

            const query = req.body.cityName;
            const apiKey = "da22cc8d14d4f3c969645648a755f570";
            const unit = "metric";
            const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid=" + apiKey +"&units=" +unit;
        
        https.get(url , function(response){
            console.log(response.statusCode);
            
            response.on("data" , function(data){
            
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<p> Weather is currently " +weatherDescription + "<p>");
            res.write("<h1>temperature at "+query+ " is " + temp+ "</h1>");
            res.write("<img src="+ imageUrl +">");
            res.send();

        })
    })
})


app.listen(8888, function(){
    console.log("Server is up and running");
})