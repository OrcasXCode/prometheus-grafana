import express from "express"
const app=express();
app.use(express.json());
// import  {middleware}  from "./middelware";
import client from "prom-client"
import { requestMiddelwareCounter } from "./metrics/requestCount";


// app.use(middleware);

app.use(requestMiddelwareCounter);


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


app.get("/metrics",async(req,res)=>{
    //!This make the pull request for the metrics
    const metrics=await client.register.metrics();
    //!this tells the user how to interpret with the metrics data
    res.set("Content-Type",client.register.contentType);
    //!this sends all the metrics stored to the client side
    res.end(metrics);
})

app.listen(3000,()=>{
    console.log("Server is running on PORT 3000")
})