import express, { Request, Response } from 'express';
import isLoggedIn from './middleware/isLoggedIn';
import createTodoRoute from './routes/createTodoRoute';
import deleteTodoRoute from './routes/deleteTodoRoute';
import loginRoute from './routes/loginRoute';
import readTodosRoute from './routes/readTodosRoute';
import updateTodoRoute from './routes/updateTodoRoute';

// create a express router, you can attach things to router directly
const router = express.Router();

// make a login endpoint
router.post('/login', loginRoute);

// endpoint for getting the whole list of todos
router.get('/todos', isLoggedIn, readTodosRoute);

// endpoint for creating todo
router.post('/todos', isLoggedIn, createTodoRoute);

// endpoint for update todo
router.put('/todos/:todoId', isLoggedIn, updateTodoRoute);

// endpoint for delete todo
router.delete('/todos/:todoId', isLoggedIn, deleteTodoRoute);

export default router;
