const { Schema, model } = require('mongoose');

// https://www.mongodb.com/developer/products/mongodb/mongodb-schema-design-best-practices/

const repositorySchema = new Schema({
  url: {
    type: String,
    required: true,
  },
  analyses: {
    type: [Schema.Types.ObjectId],
    ref: 'Analysis',
  },
});

repositorySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('Repository', repositorySchema);
