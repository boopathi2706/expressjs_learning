const {format} =require("date-fns");
const {v4 : uuid} =require("uuid");
const fs =require("fs");
const isPromise=require("fs").promises;
const path =require("path");


const logEvent = async (message,filename)=>{
  const logvalue=`${format(new Date(),"dd-MM-yyyy\tHH:mm:ss")};`
  const logitem =`${logvalue}\t${uuid()}\t${message}\n`;
  console.log(logitem);
  try{
    if(!(fs.existsSync(path.join(__dirname,"..",'logs')))){
       await  isPromise.mkdir(path.join(__dirname,"..",'logs'))
    }
    await isPromise.appendFile(path.join(__dirname,"..",'logs',`${filename}`),logitem);
  }
  catch{
    console.error(err)
  }
}
module.exports=logEvent;