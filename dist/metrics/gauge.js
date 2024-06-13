"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeRequest = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
exports.activeRequest = new prom_client_1.default.Gauge({
    name: "active_requests",
    help: "Number of active requests",
    labelNames: ['method', 'route', 'status_code']
});
