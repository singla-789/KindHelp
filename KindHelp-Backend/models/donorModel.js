var mongoose=require("mongoose");

var DonorObj={

    emailid: {type:String,require:true, index:true, unique:true},
    name: String,
    age: Number,
    gender: String,
    curaddress: String,
    curcity: String,
    contact: Number,
    qualification: String,
    occupation: String,
    adharpic: String,
    profilepic: String,
    status: { type: Number, default: 1 },
    
}
 var ver = {
      versionKey: false, // to avoid __v field in table come by default
    };

    var schema=new mongoose.Schema(DonorObj,ver);
    var DonorColRefWpic=mongoose.model("ProjDonorCollection",schema);

    module.exports=DonorColRefWpic;
