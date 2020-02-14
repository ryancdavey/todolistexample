const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
  todoDescription: {
    type: String
  },
  todoCategory: {
    type: String
  },
  todoPriority: {
    type: String
  },
  todoCreatedAtDate: {
    type: String
  },
  todoCompleted: {
    type: Boolean
  },
  userID: {
    type: String
  }
});

module.exports = mongoose.model('Todo', TodoSchema);
