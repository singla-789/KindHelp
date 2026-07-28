var express=require("express");
var userRoute=require("./routes/userRoute");
var donorRoute=require("./routes/donorRoute");
var needyRoute=require("./routes/needyRoute");
var fileuploader=require("express-fileupload");
let mongoose=require("mongoose");
const cors = require('cors')
var env=require('dotenv').config();
console.log(process.env.SEC_KEY);

var app=express();
app.use(fileuploader());
app.use(cors());

app.listen(2005,()=>{
    console.log("Server Started at 2005");
})

let mondodbAtlasUrl=process.env.atlas_url
mongoose.connect(mondodbAtlasUrl)
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use(express.json());

app.use(express.urlencoded(true));
app.use("/user",userRoute)
app.use("/donor",donorRoute)
app.use("/needy",needyRoute)
// app.use("/admin",adminRoute)


app.use("/",(req,resp)=>
    {
        resp.send("Welcome");
})