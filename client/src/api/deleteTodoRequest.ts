import { TTodo } from '../App';
import { API_URL, TOKEN } from './config';

export default async (todo: TTodo) => {
  try {
    const res = await fetch(`${API_URL}/todos/${todo._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
};
