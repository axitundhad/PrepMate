const Session=require("../models/Session");
const Question=require("../models/Question");

exports.createSession=async(req,res)=>{
    try{

    }
    catch(error){
        res.status(500).json({success:false,message:"Server erroe"});
    }
}
exports.getMySessions=async(req,res)=>{
    try{

    }catch(error){
        res.statud(500).json({success:false,message:"Server Error"});
    }
};

exports.getSessionById=async(req,res)=>{
    try{

    }
    catch(error){
        res.status(500).json({success:false,message:"Server Error"});
    }
};
exports.deleteSession=async(req,res)=>{};