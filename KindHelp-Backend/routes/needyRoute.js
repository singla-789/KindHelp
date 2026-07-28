var express=require("express");
// var {validateData}=require("../config/validation");
var obj =require("../controllers/needyController");

var appRouter=express.Router();

appRouter.post("/save",obj.saveNeedy);

appRouter.post("/fetch",obj.fetchNeedy);

appRouter.post("/upload-front",obj.uploadFront);

appRouter.post("/upload-back",obj.uploadBack);

appRouter.post("/med-finder",obj.medfinder);

appRouter.post("/recent-medicines",obj.getRecentMedicines);

appRouter.get("/contact-details/:emailid", obj.getContactDetails);

module.exports=appRouter;


