"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const middelware_1 = require("./middelware");
app.use(middelware_1.middleware);
app.get("/user", (req, res) => {
    res.send({
        name: "Jhon Doe",
        age: 20
    });
});
app.post("/user", (req, res) => {
    const user = req.body;
    res.send(Object.assign(Object.assign({}, user), { id: 1 }));
});
app.listen(3000, () => {
    console.log("Server is running on PORT 3000");
});
