import { TTodo } from '../App';
import { API_URL, TOKEN } from './config';

export default async (): Promise<TTodo[] | undefined> => {
  try {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
