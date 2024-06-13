import { NextFunction, Request, Response } from "express";
import { requestCounter } from "./counter";
import { activeRequest } from "./gauge"
import client from "prom-client";

const httpRequestDurationMicroseconds = new client.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});

export const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    activeRequest.inc();

    res.on('finish', function() {
        const endTime = Date.now();
        const duration = endTime - startTime;
    
        // Increment request counter
        requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });

        //this is the syntax for it and we pass the duration or the time taken for the req as params
        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);

        activeRequest.dec();
    });
    next();
}