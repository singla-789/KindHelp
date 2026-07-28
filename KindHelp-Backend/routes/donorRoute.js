var express=require("express");
// var {validateData}=require("../config/validation");
var obj =require("../controllers/donorController");

var appRouter=express.Router();

appRouter.post("/save",obj.doSignupPost);

appRouter.post("/update",obj.doUpdatePost);

appRouter.post("/fetch",obj.doFetchDonorPost);

appRouter.post("/fetchMed",obj.getMedicinesByDonorEmail);

appRouter.post("/dltmedicine", obj.dltmedicine);

appRouter.post("/saveMed",obj.doSaveMed);

appRouter.post("/updateMed", obj.doUpdateMed);

appRouter.get("/totalmed", obj.totalmed);






// appRouter.post("/fetch",obj.doFetch);
module.exports=appRouter;