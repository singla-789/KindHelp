var path=require("path");
var DonorColRefWpic=require("../models/donorModel");
var MedCol=require("../models/availMed");
var cloudinary=require("cloudinary").v2;
var env=require('dotenv').config();

cloudinary.config({ 
    
    cloud_name: 'dspfowrvd', 
    api_key: process.env.Cloudapi_key, 
    api_secret: process.env.CloudSec_key // Click 'View API Keys' above to copy your API secret
    });

async function doSignupPost(req,resp)
{
   try{
    let profilePicUrl = "nopic.jpg";
    let adharPicUrl = "nopic.jpg";

    if(req.files && req.files.profilepic)
    {
        let path1=path.join(__dirname,"..","uploads",req.files.profilepic.name);
        await req.files.profilepic.mv(path1);
            

        const uploadResult = await cloudinary.uploader.upload(path1);
        profilePicUrl = uploadResult.url;
        console.log("Profile Uploaded:", profilePicUrl);
    }
    
    if(req.files && req.files.adharpic)
    {
        let path2=path.join(__dirname,"..","uploads",req.files.adharpic.name);
        await req.files.adharpic.mv(path2);
            

        const uploadResult = await cloudinary.uploader.upload(path2);
        adharPicUrl = uploadResult.url;
        console.log("Aadhar Uploaded:", adharPicUrl);
    }

    req.body.profilepic=profilePicUrl;
    req.body.adharpic=adharPicUrl;

        

    var donorCol=new DonorColRefWpic(req.body);

    donorCol.save().then((docu)=>{

        resp.json({status:true,msg:"Record Saved",obj:docu}); 

        }).catch((err)=>{

        resp.json({status:false,msg:err.message});
    })
}catch (err) {
    console.error("Signup Error:", err);
    resp.status(500).json({ status: false, msg: "Signup failed", error: err.message });
  }

}


async function doUpdatePost(req,resp)
 {
   try{ 
    const email = req.body.emailid;

    let existing = await DonorColRefWpic.findOne({ emailid: email });
    if (!existing) {
      return resp.status(404).json({ status: false, msg: "Donor not found" });
    }

    if(req.files && req.files.profilepic)
    {
        let path1=path.join(__dirname,"..","uploads",req.files.profilepic.name);
        await req.files.profilepic.mv(path1);
            

        const uploadResult = await cloudinary.uploader.upload(path1);
        req.body.profilepic = uploadResult.url;
        console.log("Profile Updated:", uploadResult.url);
    }
    else{
        req.body.profilepic = existing.profilepic;
    }
    
    if(req.files && req.files.adharpic)
    {
        let path2=path.join(__dirname,"..","uploads",req.files.adharpic.name);
        await req.files.adharpic.mv(path2);
            

        const uploadResult2 = await cloudinary.uploader.upload(path2);
        req.body.adharpic = uploadResult2.url;
        console.log("Aadhar Updated:", uploadResult2.url);
    }
    else{
        req.body.adharpic = existing.adharpic;
    }

    await DonorColRefWpic.updateOne({emailid:req.body.emailid},{$set:req.body } ).then((docu)=>{

        resp.json({status:true,msg:"Record UPDATED",obj:docu}); 

        }).catch((err)=>{

        resp.json({status:false,msg:err.message});
        })

    // resp.send(req.query.txtEmail+"  "+req.query.txtPwd+" Signedup Successfully");
   }
   catch (err) {
    console.error("Update Error:", err);
    resp.status(500).json({ status: false, msg: "Update failed", error: err.message });
  }
}

async function doFetchDonorPost(req, res) {
  try {
    const { emailid } = req.body;

    if (!emailid)
      return res.json({ status: false, msg: "Email ID is required" });

    const donor = await DonorColRefWpic.findOne({ emailid });

    if (!donor)
      return res.json({ status: false, msg: "Donor not found" });

    res.json({ status: true, data: donor });
  } catch (err) {
    console.error("Fetch Error:", err);
    res.status(500).json({ status: false, msg: "Fetch failed", error: err.message });
  }
}



function doSaveMed(req,resp){

    console.log(req.body);
         var MedCol1=new MedCol(req.body);

         MedCol1.save().then((docu)=>{

               resp.json({status:true,msg:"Med Record Saved",obj:docu}); 

            }).catch((err)=>{

            resp.json({status:false,msg:err.message});
         })
}

function doUpdateMed(req, res) {
  const { emailid, medicine, ...updates } = req.body;

  MedCol.findOneAndUpdate({ emailid, medicine }, updates, { new: true })
    .then(updatedDoc => {
      if (updatedDoc)
        res.json({ status: true, msg: "Medicine record updated", obj: updatedDoc });
      else
        res.json({ status: false, msg: "Record not found" });
    })
    .catch(err => res.json({ status: false, msg: err.message }));
}

// controllers/donorController.js



// GET all medicines for a donor
const getMedicinesByDonorEmail = async (req, res) => {
  try {
    const { emailid } = req.body;
    if (!emailid) {
      return res.json({ status: false, msg: "Email ID is required" });
    }

    const medicines = await MedCol.find({ emailid });

    if (medicines.length === 0) {
      return res.json({ status: false, msg: "No medicines found for this donor" });
    }

    res.json({ status: true, data: medicines });
  } catch (err) {
    console.error("Error fetching donor medicines:", err);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};

const dltmedicine = async (req, res) => {
  try {
    const { medid } = req.body;

    if (!medid) {
      return res.json({ status: false, msg: "Medicine ID is required" });
    }

    const deleted = await MedCol.findByIdAndDelete(medid);

    if (!deleted) {
      return res.json({ status: false, msg: "Medicine not found or already deleted" });
    }

    res.json({ status: true, msg: "Medicine deleted successfully" });
  } catch (err) {
    console.error("Error deleting medicine:", err);
    res.status(500).json({ status: false, msg: "Server error" });
  }
};


const totalmed = async (req, res) => {
  try {
    const email = req.query.email;
    const count = await MedCol.countDocuments({ emailid: email });

    res.json({ status: true, msg: "Count retrieved", count });
  } catch (err) {
    res.json({ status: false, msg: err.message });
  }
};





 module.exports= {doSignupPost,doUpdatePost,doSaveMed,doUpdateMed,doFetchDonorPost,getMedicinesByDonorEmail,dltmedicine,totalmed}