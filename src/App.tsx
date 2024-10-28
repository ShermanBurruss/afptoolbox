import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  const createTodo = async () => {
    await client.models.Todo.create({
      content: window.prompt("Todo content?"),
      isDone: false,
    });
  }

  function toggleTodo(id: string) {
    // Fetch the current todo item
    client.models.Todo.get({ id }).then((result) => {
      const todo = result.data;
      if (todo) {
        // Toggle the isDone field
        const updatedTodo = { id, isDone: !todo.isDone };
        // Update the todo item with the toggled isDone value
        client.models.Todo.update(updatedTodo);
      } else {
        console.error("Todo not found");
      }
    }).catch(error => {
      console.error("Error toggling todo:", error);
    });
  }
  
  
  function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId}'s todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li onClick={() => toggleTodo(todo.id)} key={todo.id}>
            {todo.content} {todo.isDone ? "Done" : "Not Done"}
          </li>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
      <button onClick={signOut}>Sign out</button>
    </main>
  );
}

export default App;
