var mongoose=require("mongoose");

var NeedyObj={

    emailid: {type:String,require:true, index:true, unique:true},
    contact: Number,
    name: String,
    dob: Date,
    gender: String,
    address: String,
    frontadharpic: String,
    rearadharpic: String,
    
}
 var ver = {
      versionKey: false, // to avoid __v field in table come by default
    };

    var schema=new mongoose.Schema(NeedyObj,ver);
    var NeedyColRefWpic=mongoose.model("ProjNeedyCollection",schema);

    module.exports=NeedyColRefWpic;