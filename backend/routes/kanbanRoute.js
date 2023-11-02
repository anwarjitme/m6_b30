const express = require('express');
const { BoardModel } = require('../model/kanbanModel');
const kanbanRouter = express.Router();


kanbanRouter.post('/boards', async (req, res) => {
  try {
    const new_board = new BoardModel(req.body);
    await new_board.save();
    res.status(201).json(new_board);
  } catch (err) {
    res.status(401).json({ err: 'Something Wrong !' });
  }
});


kanbanRouter.get('/boards', async (req, res) => {
  try {
    const all_boards = await BoardModel.find();
    res.json(all_boards);
  } catch (err) {
    res.status(401).json({ error: 'something wrong in fetching' });
  }
});


kanbanRouter.get('/boards/:boardId/tasks', async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const board = await BoardModel.findById(boardId);
      res.json(board.tasks);
    } catch (error) {
      res.status(500).json({ error: ' not fetching tasks' });
    }
  });
  

kanbanRouter.post('/boards/:boardId/tasks', async (req, res) => {
    try {
      const id = req.params.boardId;
      const task = req.body;
      const target_board = await BoardModel.findById(id);
     target_board.tasks.push(task);
      await target_board.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ error: 'task creattion field' });
    }
  });

kanbanRouter.patch('/boards/:boardId/tasks/:taskId', async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const taskId = req.params.taskId;
      const taskData = req.body;
      const target_board = await BoardModel.findById(boardId);
      const task = target_board.tasks.id(taskId);
  
      if (task) {
        task = { ...task, ...taskData };
        await target_board.save();
       
        res.json(task);
      } else {
        res.status(404).json({ error: 'not found' });
      }
    } catch (err) {
      res.status(501).json({ error: 'wrong went' });
    }
  });

 
  
kanbanRouter.delete('/boards/:boardId/tasks/:taskId', async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const taskId = req.params.taskId;
      const taget_board = await BoardModel.findById(boardId);
      const task = target_board.tasks.id(taskId);
  
      if (task) {
        task.remove();
        await target_board.save();
        res.json({ message: 'Task deleted successfully' });
      } else {
        res.status(404).json({ err: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Could not delete the task' });
    }
  });
  

kanbanRouter.post('/boards/:boardId/tasks/:taskId/subtasks', async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const taskId = req.params.taskId;
      const subtask = req.body;
      const board = await BoardModel.findById(boardId);
      const task = board.tasks.id(taskId);
      task.subtasks.push(subtask);
      await board.save();
      res.status(201).json(subtask);
    } catch (error) {
      res.status(500).json({ error: 'Could not create a subtask' });
    }
  });

kanbanRouter.get('/boards/:boardId/tasks/:taskId/subtasks', async (req, res) => {
    try {
      const boardId = req.params.boardId;
      const taskId = req.params.taskId;
      const board = await BoardModel.findById(boardId);
      const task = board.tasks.id(taskId);
  
      if (task) {
        const subtasks = task.subtasks;
        res.json(subtasks);
      } else {
        res.status(404).json({ error: 'Task not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'something erorr to fetch subtasks' });
    }
  });
  
  

  


module.exports = 
{
    kanbanRouter
}
