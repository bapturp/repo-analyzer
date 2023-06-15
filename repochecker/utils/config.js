require("dotenv").config();

const AWS_REGION = process.env.REGION;

const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  AWS_REGION,
  MONGODB_URI,
};
