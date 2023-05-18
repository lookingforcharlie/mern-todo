import { FC, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { TTodo } from '../App';
import createTodoRequest from '../api/createTodoRequest';

interface CreateTodoFormProps {}

const CreateTodoForm: FC<CreateTodoFormProps> = ({}) => {
  const [text, setText] = useState<string>('');
  const queryClient = useQueryClient();

  // useMutation is for updating items
  const { mutate: createTodo } = useMutation(
    (newTodo: TTodo) => createTodoRequest(newTodo),
    {
      onSettled: () => {
        // when 'todos' changes, we need invalidate cache to let it render on the page
        queryClient.invalidateQueries('todos');
      },
    }
  );

  // const handleCreateTodo = (e:React.FormEvent<HTMLFormElement>) => {
  //   createTodo()
  // }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (text.trim() === '') {
            return;
          } else {
            createTodo({
              text,
            });
          }
          setText('');
        }}
        className='flex gap-4'
      >
        <input
          value={text}
          type='text'
          onChange={(e) => setText(e.target.value)}
          className='focus:outline-none rounded-md px-2 py-1 '
        />
        <button className='border border-stone-700 px-4 rounded-md shadow-lg hover:scale-95 duration:200 transform transition-transform'>
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateTodoForm;
