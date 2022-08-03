import express from "express";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import bodyParser from "body-parser";

import https from "https";

const app= express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});


app.post("/",function(req,res){

   // console.log(req.body.fName);
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;

    const data={
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                    }
            }
        ]
    }

    const jsonData= JSON.stringify(data);

    //console.log(member);

    const url= "https://us17.api.mailchimp.com/3.0/lists/8ee2ac2e36"

    const options= {
        method: "POST",
        auth: "samrat:fc12a79c7503357a23a153c0306d1a72-us17"
    }

   const request= https.request(url,options,function(response){

        if(response.statusCode===200){
           console.log(response.statusCode);
           res.sendFile(__dirname+"/success.html");
        }
        else{
            console.log(response.statusCode);
            res.sendFile(__dirname+"/failure.html");
        }

        // response.on("data",data=>{
        //     console.log(JSON.parse(data));
        // })
    });
    
    request.write(jsonData);
    request.end();

});



app.listen(3000,function(req,res){
    console.log("server is running");
});



// api key
// fc12a79c7503357a23a153c0306d1a72-us17
// audience id 
// 8ee2ac2e36