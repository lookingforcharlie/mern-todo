import { FC } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TTodo } from '../App';
import deleteTodoRequest from '../api/deleteTodoRequest';
import updateTodoRequest from '../api/updateTodoRequest';

interface TodoItemProps {
  todo: TTodo;
}

const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  // we need useQueryClient, when we doing some complex mutations or you need to invalidate your cache
  const queryClient = useQueryClient();

  // useMutation is for updating items
  const { mutate: updateTodo } = useMutation(
    (updatedTodo: TTodo) => updateTodoRequest(updatedTodo),
    {
      onSettled: () => {
        // when 'todos' changes, we need invalidate cache to let it render on the page
        queryClient.invalidateQueries('todos');
      },
    }
  );

  const handleToggleCompletion = () => {
    updateTodo({
      ...todo,
      completed: !todo.completed,
    });
  };

  const { mutate: deleteTodo } = useMutation(
    (updatedTodo: TTodo) => deleteTodoRequest(updatedTodo),
    {
      onSettled: () => {
        // when 'todos' changes, we need invalidate cache to let it render on the page
        queryClient.invalidateQueries('todos');
      },
    }
  );

  return (
    <div className='flex items-center gap-2'>
      <div>
        <input
          checked={todo.completed}
          type='checkbox'
          onChange={handleToggleCompletion}
        />
      </div>
      <div className=''>
        <input
          value={todo.text}
          type='text'
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateTodo({
              ...todo,
              text: e.target.value,
            })
          }
          className='px-2 rounded-sm focus:outline-none'
        />
      </div>
      <div>
        <button onClick={() => deleteTodo(todo)}>Delete</button>
      </div>
    </div>
  );
};

export default TodoItem;
