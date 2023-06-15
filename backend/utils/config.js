require('dotenv').config();

const PORT = process.env.PORT;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const AWS_REGION = process.env.AWS_REGION;

const AWS_API_VERSION = process.env.AWS_API_VERSION;

const SQS_QUEUE_URL = process.env.SQS_QUEUE_URL;

module.exports = {
  PORT,
  MONGODB_URI,
  AWS_REGION,
  AWS_API_VERSION,
  SQS_QUEUE_URL,
};
