const repositoryRouter = require('express').Router();
const Repository = require('../models/repository');

repositoryRouter.get('/', async (request, response) => {
  const repositories = await Repository.find({}).populate('analyses', {
    status: 1,
    _id: 1,
  });

  return response.json(repositories);
});

repositoryRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const repositories = await Repository.findById(id).populate('analyses', {
    status: 1,
    _id: 1,
  });

  return response.json(repositories);
});

module.exports = repositoryRouter;
