"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/ads", (request, response) => {
    // return response.send("Acessou ads");
    return response.json([
        {
            id: 1,
            nome: 'lucas'
        }, {
            id: 2,
            nome: 'amanda'
        }, {
            id: 3,
            nome: 'isabela'
        }, {
            id: 4,
            nome: 'sabela'
        }
    ]);
});
app.listen(3333);
