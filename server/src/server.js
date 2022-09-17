import express from 'express';
const app = express();
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
        }
    ]);
});
app.listen(3333);
