import express, { Request, Response } from 'express';
// once we have the TodoModel, we can start to query the database
import TodoModel from '../models/TodoModel';

// Keep the code clean and maintainable
// we are fetching all the todo-list from the database
export default async (req: Request, res: Response) => {
  const todoId = req.params.todoId;

  const targetTodo = await TodoModel.findByIdAndDelete(todoId);

  if (targetTodo === null) {
    res
      .status(400)
      .send(`Didn't find todo item with id of ${todoId}, nothing is deleted.`);
    return;
  }
  console.log('Following todo is deleted:');
  res.status(204).json(targetTodo);
};
