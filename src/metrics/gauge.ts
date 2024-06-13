import { NextFunction,Request,Response } from "express";
import client from "prom-client";
import { requestCounter } from "./counter";


export const activeRequest=new client.Gauge({
    name:"active_requests",
    help:"Number of active requests",
    labelNames:['method','route','status_code']
})

