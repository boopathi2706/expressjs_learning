const express=require("express");
const app=express();
const path=require("path");
const PORT = process.env.PORT || 5000;
const logEvent=require("./middleware/logEvents.js");
const errHandle=require("./middleware/errorHandle.js");

//custom middleware

app.use((req,res,next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`,"reqLog.txt");
    console.log(`${req.method}\t${req.headers.origin}\t${req.url}`);
    next();
})



//build middleware

app.use(express.urlencoded({extended:false}));
// this is used for take data from our form 
app.use(express.json());
//handle json datas
app.use(express.static(path.join(__dirname,"./public")));
//access all static file example we handle only html file not css image or data.txt file so these file are 
//contain public folder that folder to alcate to static file









//send only content 
app.get("/content",(req,res)=>{
    res.send("hello this is server content example....");
})


// send complete html or react file
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'view','main.html'));

})

//case 1 and case 2 (important note refer):
app.get("^/$|/index(.html)?",(req,res)=>{
    res.sendFile(path.join(__dirname,'view','main.html'));

})

//case 3:(refer text file)
app.get("/old-page(.html)?",(req,res)=>{
    res.redirect(301,"/new");
})
//case 4:(refer text file)
// app.get("/*",(req,res)=>{
//     res.status(404).sendFile(path.join(__dirname,"view","error_404.html"));
// })



//route handling

app.get("/handling(.html)?",(req,res,next)=>{
    console.log("handling ");
    next();
 },(req,res)=>{
    res.send("hello makkale");
 })


 const one=(req,res,next)=>{
    console.log("one");
    next()
 }
 const two=(req,res,next)=>{
    console.log("two");
    next()
 }
 const three=(req,res)=>{
    res.send("finish");
    
 }
 app.get("/chain(.html)?",[one ,two,three]);



app.get("/new",(req,res)=>{
    res.sendFile(path.join(__dirname,'view','new-page.html'));
})

app.get("/*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"view","error_404.html"));
})
// its is same for 404 error handle but it handle all type get post ...etc...
app.all('*', (req, res) =>{ 
    res.status(404); 
    if (req.accepts('html')) { 
    res.sendFile(path.join(_dirname, 'views', '404.html')); 
    } else if (req.accepts('json')) { 
    res.json({ "error": "404 Not Found" }); 
    } else { 
    res.type('txt').send("404 Not Found"); 
    } 
    }) 

app.use(errHandle);
app.listen(PORT,()=>{console.log(`server running on ${PORT}`)});