const express=require("express");
const router=express.Router();
const path=require("path");

// data={};

// data.employee=require("../model/employee.json");

const employeeController=require("../Controllers/employeeController")

router.route("/")

// before using MVC 

//       .get((req,res)=>{
//         res.json(data.employee);
//       })
//       .post((req,res)=>{
//         res.json({
//             "name":req.body.name,
//             "job":req.body.job
//         })
//       })
//       .put((req,res)=>{
//         res.json({
//             "name":req.body.name,
//             "job":req.body.job
//         })
//       })
//       .delete((req,res)=>{
//         res.json({"id":req.body.id})
//       })
// router.route("/:id").get((req,res)=>{
//     res.json({"id":req.params.id});
// })



//After using MCV
.get(employeeController.viewAllEmployees)
.post(employeeController.createEmployee)
.put(employeeController.updateEmployee)
.delete(employeeController.deleteEmployee)
router.route("/:id").get(employeeController.getAEmployee);

module.exports=router;