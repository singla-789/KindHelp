var path=require("path");

var UsercolRefWopic=require("../models/userModel");
var AvMed=require("../models/availMed");
var CitCt=require("../models/donorModel");
var NdyCt=require("../models/needyModel");

var jwt = require("jsonwebtoken");

function doSignupPostWopic(req,resp)
 {
   
         console.log(req.body);
         var userCol=new UsercolRefWopic(req.body);

         userCol.save().then((docu)=>{

               resp.json({status:true,msg:"Record Saved",obj:docu}); 

            }).catch((err)=>{

            resp.json({status:false,msg:err.message});
         })
    
 }


 function doLogin(req,resp)
 {
    UsercolRefWopic.findOne({ uid: req.body.uid, pwd:req.body.pwd })
      .then((docu) => {
         if(docu!=null){
            let jtoken = jwt.sign({uid:req.body.uid,usertype: docu.usertype},process.env.SEC_KEY,{expiresIn:"1h"});
            resp.json({status:true,msg:"Record Found",obj:docu,token:jtoken});     
         }
         else
            resp.json({status:false,msg:"Invalid Id and Password Found"});  
      })
      .catch((err) => {
        return resp.json({ status: false, msg: err.message });
      });   
 } 

 // Count donated medicines
async function med(req, res) {
  console.log("HIT /user/meddonated");
  try {
    const count = await AvMed.countDocuments({});
    console.log("Sending /meddonated:", count);
    return res.json({ status: true, msg: "Count retrieved", count });
  } catch (err) {
    console.error("med error:", err.message);
    return res.status(500).json({ status: false, msg: err.message });
  }
}

// Count unique cities from donors
function countcities(req,resp) { 
  CitCt.countDocuments({}) .then((count) => { 
    resp.json({ status: true, msg: "Count retrieved", count }); }) 
    .catch((err) => { 
      resp.json({ status: false, msg: err.message });
     });
     } 

// Count needy requests
async function countneedies(req, res) {
  console.log("HIT /user/countneedies");
  try {
    const count = await NdyCt.countDocuments({});
    console.log("Sending /countneedies:", count);
    return res.json({ status: true, msg: "Count retrieved", count });
  } catch (err) {
    console.error("countneedies error:", err.message);
    return res.status(500).json({ status: false, msg: err.message });
  }
}


  async function getNameByEmail(req, res) {
    const { email, type } = req.query;

    try {
      let doc;
      if (type === "donor") {
        doc = await CitCt.findOne({ emailid: email });
      } else if (type === "recipient") {
        doc = await NdyCt.findOne({ emailid: email });
      }

      if (doc) {
        res.json({ status: true, name: doc.name });
      } else {
        res.json({ status: false, msg: "User not found" });
      }
    } catch (err) {
      res.json({ status: false, msg: err.message });
    }
  }

 module.exports= {doLogin,doSignupPostWopic,med,countcities,countneedies,getNameByEmail}