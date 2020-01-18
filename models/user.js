const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group'}]
});

module.exports = mongoose.model('User', UserSchema);
