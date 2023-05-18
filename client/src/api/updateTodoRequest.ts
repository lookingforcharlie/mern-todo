import { TTodo } from '../App';
import { API_URL, TOKEN } from './config';

export default async (todo: TTodo): Promise<TTodo | undefined> => {
  try {
    const res = await fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: todo.text,
        completed: todo.completed,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
