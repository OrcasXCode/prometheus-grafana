"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metricsMiddleware = void 0;
const counter_1 = require("./counter");
const gauge_1 = require("./gauge");
const prom_client_1 = __importDefault(require("prom-client"));
const httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
    name: 'http_request_duration_ms',
    help: 'Duration of HTTP requests in ms',
    labelNames: ['method', 'route', 'code'],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000] // Define your own buckets here
});
const metricsMiddleware = (req, res, next) => {
    const startTime = Date.now();
    gauge_1.activeRequest.inc();
    res.on('finish', function () {
        const endTime = Date.now();
        const duration = endTime - startTime;
        // Increment request counter
        counter_1.requestCounter.inc({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            status_code: res.statusCode
        });
        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.path,
            code: res.statusCode
        }, duration);
        gauge_1.activeRequest.dec();
    });
    next();
};
exports.metricsMiddleware = metricsMiddleware;
