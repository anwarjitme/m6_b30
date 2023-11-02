const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  title: String,
  isCompleted: Boolean,
});

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  subtasks: [subtaskSchema],
});

const boardSchema = new mongoose.Schema({
  name: String,
  tasks: [taskSchema],
});

const BoardModel = mongoose.model('Board', boardSchema);

module.exports={
    BoardModel
}
