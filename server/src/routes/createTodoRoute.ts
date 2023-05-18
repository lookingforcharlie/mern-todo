import express, { Request, Response } from 'express';
// once we have the TodoModel, we can start to query the database
import TodoModel from '../models/TodoModel';

// Keep the code clean and maintainable
// we are fetching all the todo-list from the database
export default async (req: Request, res: Response) => {
  // if I use the way of desctructuring, the text won't be added in MongoDB, why?
  // const { text } = req.body.text;
  const newTodo = new TodoModel({
    text: req.body.text,
    completed: false,
  });

  const createdTodo = await newTodo.save();

  console.log('Just created a todo item with _id:', createdTodo._id);

  res.json(createdTodo);
};
