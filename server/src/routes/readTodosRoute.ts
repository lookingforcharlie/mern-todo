import express, { Request, Response } from 'express';
// once we have the TodoModel, we can start to query the database
import TodoModel from '../models/TodoModel';

// Keep the code clean and maintainable
// we are fetching all the todo-list from the database
export default async (req: Request, res: Response) => {
  const todos = await TodoModel.find();
  res.json(todos);
};
