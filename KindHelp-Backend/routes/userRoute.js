var express=require("express");
// var {validateData}=require("../config/validation");
var obj =require("../controllers/userController");

var appRouter=express.Router();
var validateObj = require("../config/validate")

appRouter.post("/signup",obj.doSignupPostWopic);

appRouter.post("/login",obj.doLogin);

appRouter.get("/meddonated",obj.med);

appRouter.get("/countcities",obj.countcities);

appRouter.get("/countneedies",obj.countneedies);

appRouter.get("/getNameByEmail", obj.getNameByEmail);

module.exports=appRouter;