import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { CircleLoader } from 'react-spinners';
import readTodosRequest from './api/readTodosRequest';
import CreateTodoForm from './components/CreateTodoForm';
import TodoItem from './components/TodoItem';

export type TTodo = {
  text: string;
  completed?: boolean;
  _id?: string;
};
function App() {
  // 1st argument is a special key you plan to cache your data in
  // 2nd is a callback function needs to return the actual data
  // So we don't need state, cos react-query has the state under the hood
  // So we don't useEffect anymore, cos when the page mount, it's going to automatically fetch the data
  const { isLoading, data: todos } = useQuery('todos', readTodosRequest);

  return (
    <div className='flex flex-col items-center justify-start gap-4 h-screen mx-auto py-12'>
      <h1 className='text-3xl font-bold mb-8'>Mern Todo App</h1>
      <div className='text-stone-800'>
        <CreateTodoForm />
      </div>
      <h1 className=' flex flex-col items-center gap-2 mx-auto'>
        {isLoading ? (
          <CircleLoader size={150} />
        ) : (
          todos !== undefined &&
          todos.map((todo) => (
            <div key={todo._id} className='text-stone-800 text-lg w-full'>
              <TodoItem todo={todo} />
            </div>
          ))
        )}
      </h1>
    </div>
  );
}

export default App;

// Without react-query
// function App() {
//   const [todos, setTodos] = useState<TTodo[]>([]);

//   useEffect(() => {
//     readTodosRequest().then((allTodos: TTodo[] | undefined) => {
//       if (allTodos !== undefined) setTodos(allTodos);
//     });
//   }, []);

//   return (
//     <div className='flex flex-col items-center justify-start h-screen mx-auto py-12'>
//       <h1 className='text-2xl'>
//         {todos.map((todo) => {
//           return <div key={todo._id}>{todo.text}</div>;
//         })}
//       </h1>
//     </div>
//   );
// }
