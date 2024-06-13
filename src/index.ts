import express from "express"
const app=express();
app.use(express.json());
import  {middleware}  from "./middelware";


app.use(middleware);


app.get("/user",(req,res)=>{
    res.send({
        name:"Jhon Doe",
        age:20
    })
})


app.post("/user",(req,res)=>{
    const user=req.body;
    res.send({
        ...user,
        id:1,
    })
})

app.listen(3000,()=>{
    console.log("Server is running on PORT 3000")
})