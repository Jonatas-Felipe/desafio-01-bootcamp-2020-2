const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const respositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (respositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  const repository = {
    id,
    title,
    url,
    techs,
    likes: 0
  }

  repositories[respositoryIndex] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const respositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (respositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repositories.splice(respositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const respositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (respositoryIndex < 0) {
    return response.status(400).json({ error: 'Repository not found.' });
  }

  repositories[respositoryIndex].likes = repositories[respositoryIndex].likes + 1;

  return response.json(repositories[respositoryIndex]);
});

module.exports = app;
