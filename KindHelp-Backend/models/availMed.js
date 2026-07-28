var mongoose=require("mongoose");

var AvailMed={
    
    emailid: String,
    medicine: String,
    company: String,
    expdate: Date,
    packing: String,
    qty: Number,
    info: String,
    
}
 var ver = {
      versionKey: false, // to avoid __v field in table come by default
    };

    var schema=new mongoose.Schema(AvailMed,ver);
    var MedCol=mongoose.model("MedCollection",schema);

    module.exports=MedCol;
