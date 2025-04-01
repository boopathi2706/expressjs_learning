const express=require("express");
const router=express.Router();
const path=require("path");



//case 1 and case 2 (important note refer):
router.get("^/$|/main(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..",'view','main.html'));

})
router.get("/new-page(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,"..",'view','new-page.html'));

})

// //case 3:(refer text file)
// router.get("/old-page(.html)?",(req,res)=>{
//     res.redirect(301,"/new");
// })
//case 4:(refer text file)
router.get("/*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"..","view","error_404.html"));
})


module.exports=router;