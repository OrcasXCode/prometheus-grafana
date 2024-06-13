import { NextFunction,Request,Response } from "express";
import client from "prom-client";
import { requestCounter } from "./counter";


const activeRequest=new client.Gauge({
    name:"active_requests",
    help:"Number of active requests",
    labelNames:['method','route','status_code']
})

export const activeRequestCounter=(req:Request,res:Response,next:NextFunction)=>{
    const startTime=Date.now();
    activeRequest.inc();
    res.on('finish',()=>{
        const endTime=Date.now();
        console.log(`Time for the response is ${endTime-startTime} ms`);
        requestCounter.inc({
            method:req.method,
            route : req.route ?  req.route.path : req.path,
            status_code:res.statusCode
        })
        activeRequest.dec();
    })
    next();
}
