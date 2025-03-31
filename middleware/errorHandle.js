const logEvent=require("./logEvents");

const errorhandle=(err,req,res,next)=>{
    logEvent(`${err.name}\t${err.message}`,"errLog.txt");
    console.error(`${err.stack}`);
    res.status(500).send(`${err.message}`);
    next();
}
module.exports=errorhandle;