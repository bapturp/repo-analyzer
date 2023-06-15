const { Schema, model } = require('mongoose');

const analysisSchema = new Schema({
  status: {
    type: String,
    enum: ['Pending', 'Done', 'Failed'],
    default: 'Pending',
  },
  hasReadme: {
    type: Boolean,
    default: false,
  },
  hasTestsFolder: {
    type: Boolean,
    default: false,
  },
  hasPackageLock: {
    type: Boolean,
    default: false,
  },
  isDockerized: {
    type: Boolean,
    default: false,
  },
  hasGithubAction: {
    type: Boolean,
    default: false,
  },
  repository: {
    type: Schema.Types.ObjectId,
    ref: 'Repository',
    required: true,
  },
});

analysisSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = model('Analysis', analysisSchema);
