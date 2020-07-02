const express = require('express');
const { uuid } = require('uuidv4');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

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

/**
 * Tipos de parâmetros
 * 
 * Query Params: Filtros e Paginação 
 * Route Params: Identificar recursos na atualização ou deleção
 * Request Body: Conteúdo na hora de criar ou editar um recurso (JSON)
 */

/**
 * Middleware
 * 
 * Interciptador de requisições que pode interromper totalmente a requisição ou alterar
 * dados da requisições
 */

const projects = [];

function logRequests(request, reponse, next) {
    const { method, url } = request;

    const logLabel = `[${method.toUpperCase()}] ${url}`;

    console.log(logLabel);

    return next();
}

app.use(logRequests);

app.get('/projects', (request, response) => {

    const { title } = request.query;
    console.log(title);

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const { title, owner } = request.body;

    const project = { id: uuid(), title, owner };

    projects.push(project);

    return response.json(project);
});

app.put('/projects/:id', (request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex < 0) {
        return response.status(400).json({ error: "Project not found" });
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id);
    
    if (projectIndex < 0) {
        return response.status(400).json({ error: "Project not found" });
    }

    projects.splice(projectIndex, 1);

    return response.status(204).send();
});



app.listen(3333, () => {
    console.log('Backend started!')
});