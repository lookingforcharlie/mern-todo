import { TTodo } from '../App';
import { API_URL, TOKEN } from './config';

export default async (todo: TTodo): Promise<TTodo | undefined> => {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: todo.text,
      }),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
