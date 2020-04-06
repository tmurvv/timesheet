const mongoose = require('mongoose');
const {makesModelsSchema} = require('./Schemas');

const MakesModels = mongoose.model('MakesModels', makesModelsSchema);

module.exports = MakesModels;
