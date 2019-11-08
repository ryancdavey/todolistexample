const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true, unique: true, sparse: true, trim: true, minlength: 4 },
  //completedStatus: { type: Boolean, required: true }
}, {
  timestamps: true,
  //sparse: true,
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task