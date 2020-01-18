const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GroupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId, ref: 'User'
  }
});

module.exports = mongoose.model('Group', GroupSchema);
