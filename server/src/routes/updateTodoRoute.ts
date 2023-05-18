import express, { Request, Response } from 'express';
// once we have the TodoModel, we can start to query the database
import TodoModel from '../models/TodoModel';

// Keep the code clean and maintainable
// we are fetching all the todo-list from the database
export default async (req: Request, res: Response) => {
  const todoId = req.params.todoId;

  const targetTodo = await TodoModel.findById(todoId);
  if (targetTodo === null) {
    res.status(400).send(`Didn't find todo item with id of ${todoId}`);
    return;
  }
  targetTodo.text = req.body.text;

  targetTodo.completed = req.body.completed;

  await targetTodo.save();

  // sending the whole list of todos back to client
  const todos = await TodoModel.find();
  res.json(todos);
};

// Following code doesn't work, why
// if (req.body.completed) {
//   targetTodo.completed = req.body.completed;
// }
