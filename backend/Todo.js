const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Todo = new Schema({
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
  }
});

module.exports = mongoose.model('Todo', Todo);
