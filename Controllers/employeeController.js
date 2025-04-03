

const data={
    employee:require("../model/employee.json"),
    setEmployee: function(data){this.employee=data}
}

const viewAllEmployees=((req,res)=>{
            res.json(data.employee);
 })

 const createEmployee=((req,res)=>{
           const value={
            id:data.employee?.length? data.employee[data.employee.length-1].id + 1 : 1,
            name:req.body.name,
            job:req.body.job
           }
           if(!value.name || !value.job){
            return res.status(400).json({"message": "name and job is required..."});
           }
           data.setEmployee([...data.employee,value]);
           return res.status(201).json(data.employee);
})

const updateEmployee=((req,res)=>{
          const updateVal=data.employee.find(emp=>emp.id===parseInt(req.body.id));
          if(!updateVal){
            res.status(400).json({"message":`The employee id ${req.body.id} Not found`});
          }
          if(req.body.name) updateVal.name=req.body.name;
          if(req.body.job) updateVal.job=req.body.job;
          const filterdata=data.employee.filter(emp=>emp.id!==parseInt(req.body.id));
          const updateData=[...filterdata,updateVal];
          data.setEmployee(updateData.sort((a,b)=>a.id>b.id?1:a.id<b.id?-1:0));
          return res.status(201).json(data.employee);
})

const deleteEmployee=((req,res)=>{
           const deletedata=data.employee.find(emp=>emp.id===parseInt(req.body.id));
           if(!deletedata){
            return res.status(400).json({"message":`the employee ID ${req.body.id} not found...`});
           }
           const filterdata=data.employee.filter(emp=>emp.id!=parseInt(req.body.id));
           data.setEmployee([...filterdata]);
           res.status(201).json(data.employee);
})

const getAEmployee=((req,res)=>{
    const takeemp=data.employee.find(emp=>emp.id===parseInt(req.body.id));
    if(!takeemp){
        return res.status(400).json({"message":`the employee ID ${req.body.id} not fount...`});
    }
    return res.status(201).json(takeemp);
})


module.exports={
    viewAllEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getAEmployee
}