"use strict";
// import { NextFunction,Request,Response } from "express";
// import client from "prom-client";
// import { requestCounter } from "./counter";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeRequestCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const counter_1 = require("./counter");
const activeRequest = new prom_client_1.default.Gauge({
    name: "active_requests",
    help: "Number of active requests",
    labelNames: ['method', 'route', 'status_code']
});
const activeRequestCounter = (req, res, next) => {
    const startTime = Date.now();
    console.log(`Incrementing active request counter for ${req.method} ${req.url}`);
    activeRequest.inc({ method: req.method, route: req.route ? req.route.path : req.path, status_code: "unknown" });
    res.on('finish', () => {
        const endTime = Date.now();
        console.log(`Time for the response is ${endTime - startTime} ms`);
        const labels = {
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode.toString()
        };
        counter_1.requestCounter.inc(labels);
        console.log(`Decrementing active request counter for ${req.method} ${req.url}`);
        activeRequest.dec(labels);
    });
    next();
};
exports.activeRequestCounter = activeRequestCounter;
