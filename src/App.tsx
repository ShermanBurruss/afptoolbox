import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from "aws-amplify/data";
import Header from "./components/Header.tsx";
import "./App.css";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  const { user, signOut } = useAuthenticator();

  useEffect(() => {
    const subscription = client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  
    return () => {
      subscription.unsubscribe(); // Cleanup the subscription
    };
  }, []);

  console.log("User",user);
  const createTodo = async () => {
    const content = window.prompt("Todo content?");
    if (content) {
      await client.models.Todo.create({
        content,
        isDone: false,
      });
    }
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
      .then(() => {
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id)); // Remove from local state
      })
      .catch(error => {
        console.error("Error deleting todo:", error);
      });
  }

  return (
    <main>
      <Header />
      <h1>{user?.userAttributes?.companyName} - {user?.userAttributes?.scac}</h1>
      <h3>{user?.userAttributes?.firstName} {user?.userAttributes?.lastName}</h3>
      <button onClick={createTodo}>+ new</button>
      <ul>
  {todos.map((todo) => (
    <li key={todo.id}>
      <span onClick={() => toggleTodo(todo.id)} style={{ cursor: "pointer" }}>
        {todo.content} {todo.isDone ? "Done" : "Not Done"}
      </span>
      <button 
        onClick={() => deleteTodo(todo.id)} 
        style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
      >
        Delete
      </button>
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
