const express = require('express');

const app = express();

/*
 * Métodos HTTP
 *
 * GET: Busca uma única informação ou listagem do back-end
 * POST: Ciar uma informação no back-end
 * PUT: Alterar uma informação do back-end
 *  - PUT: Atualiza o objeto todo
 *  - PATCH: Atualiza dados específicos de um recurso
 * DELETE: Deleta uma informação no back-end
 */

app.get('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2'
    ]);
});

app.post('/projects', (request, response) => {
    return response.json([
        'Projeto 1',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.put('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 4',
        'Projeto 2',
        'Projeto 3'
    ]);
});

app.delete('/projects/:id', (request, response) => {
    return response.json([
        'Projeto 2',
        'Projeto 3'
    ]);
});



app.listen(3333, () => {
    console.log('Backend started!')
});