"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// import  {middleware}  from "./middelware";
const prom_client_1 = __importDefault(require("prom-client"));
const histogramRequest_1 = require("./metrics/histogramRequest");
// import { requestMiddelwareCounter } from "./metrics/requestCount";
// import { activeRequestCounter } from "./metrics/activeRequests";
// app.use(middleware);
// app.use(requestMiddelwareCounter);
// app.use(activeRequestCounter);
app.use(histogramRequest_1.metricsMiddleware);
// app.get("/user",(req,res)=>{
//     res.send({
//         name:"Jhon Doe",
//         age:20
//     })
// })
app.post("/user", (req, res) => {
    const user = req.body;
    res.send(Object.assign(Object.assign({}, user), { id: 1 }));
});
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //!This make the pull request for the metrics
    const metrics = yield prom_client_1.default.register.metrics();
    //!this tells the user how to interpret with the metrics data
    res.set("Content-Type", prom_client_1.default.register.contentType);
    //!this sends all the metrics stored to the client side
    res.end(metrics);
}));
app.get("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    res.send({
        name: "John Doe",
        age: 25,
    });
}));
app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});
