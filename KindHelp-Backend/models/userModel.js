var mongoose=require("mongoose");

var UserObj={
    uid:{type:String,require:true, index:true, unique:true},
    pwd: String,
    usertype: String,
    status: { type: Number, default: 1 },
    
}
 var ver = {
      versionKey: false, // to avoid __v field in table come by default
    };

    var schema=new mongoose.Schema(UserObj,ver);
    var UsercolRefWopic=mongoose.model("ProjUserCollection",schema);

    module.exports=UsercolRefWopic;
