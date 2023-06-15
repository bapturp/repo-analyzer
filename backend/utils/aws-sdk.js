const config = require('./config');
const aws = require('aws-sdk');

aws.config.update({ region: config.AWS_REGION });

const sqs = new aws.SQS({ apiVersion: config.AWS_API_VERSION });

module.exports = { sqs };
