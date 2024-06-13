"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const middleware = (req, res, next) => {
    const startTime = Date.now();
    next();
    const endTime = Date.now();
    console.log(`Time for the response is ${endTime - startTime} ms`);
};
exports.middleware = middleware;
