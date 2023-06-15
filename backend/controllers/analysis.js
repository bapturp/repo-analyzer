const analysisRouter = require('express').Router();
const Repository = require('../models/repository');
const Analysis = require('../models/analysis');
const { sqs } = require('../utils/aws-sdk');
const { SQS_QUEUE_URL } = require('../utils/config');
const logger = require('../utils/logger');

analysisRouter.get('/', async (request, response) => {
  const analyses = await Analysis.find({}).populate('repository', {
    url: 1,
  });

  return response.json(analyses);
});

analysisRouter.get('/:id', async (request, response) => {
  const { id } = request.params;

  const analysis = await Analysis.findById(id).populate('repository', {
    url: 1,
  });

  console;

  return response.json(analysis);
});

analysisRouter.post('/', async (request, response) => {
  // TODO: validate url
  // TODO: don't start another analysis if one is still pending

  const body = request.body;

  let repository = await Repository.findOne({ url: body.url });

  if (repository === undefined) {
    repository = new Repository({
      url: body.url,
    });

    repository = await repository.save();
  }

  const analysis = new Analysis({
    repository: repository._id,
  });

  const params = {
    DelaySeconds: 10,
    MessageAttributes: {
      Analysis: {
        Datatype: 'String',
        StringValue: analysis._id,
      },
    },
    MessageBody: repository.url,
    QueueUrl: SQS_QUEUE_URL,
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      logger.error(err);
      return response.status(500).json({ error: err });
    } else {
      logger.info(data.MessageId);
      return response.status(201).json(analysis);
    }
  });
});

module.exports = analysisRouter;
