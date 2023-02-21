import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './components/Home';
import Navigation from './components/Navigation';
import Create from './components/Create';
import Todo from './components/Todo';
import Edit from './components/Edit'
import TodoList from './components/TodoList';

function App() {

  const [todo, setTodo] = useState([]);
  const [getId, setGetId] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchTodo = () => {
    setIsLoaded(false);
    fetch('https://todo-e6d84-default-rtdb.firebaseio.com/todos.json').then((response) => {
      return response.json();
    }).then((data) => {
      const todos = [];
      for (let key in data) {
        todos.push({
          id: key,
          task: data[key].task
        })
      }
      setTodo(todos);
      setIsLoaded(true);
      console.log(todos);
    })
  }

  useEffect(() => {
    fetchTodo();
  }, [])

  const handleAddTodo = (taskData) => {
    setIsLoaded(false);
    fetch('https://todo-e6d84-default-rtdb.firebaseio.com/todos.json', {
      method: 'POST',
      body: JSON.stringify(taskData)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      setIsLoaded(true);
    })
  }

  const handleDeleteTodo = (id) => {
    console.log(id);
    fetch(`https://todo-e6d84-default-rtdb.firebaseio.com/todos/${id}.json`, {
      method: 'DELETE',
    })
    const newTodo = todo.filter((elem) => elem.id !== id);

    setTodo(newTodo);
    console.log(newTodo);
  }

  const handleEditedTask = (revisedData) => {
    setIsLoaded(false);
    console.log(getId);
    fetch(`https://todo-e6d84-default-rtdb.firebaseio.com/todos/${getId}.json`, {
      method: 'PATCH',
      body: JSON.stringify(revisedData),
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
      const revisedTask = [...todo];
      console.log(data);
      let index = revisedTask.findIndex((elem) => elem.id === getId);
      console.log(index);
      revisedTask.splice(index, 1, data);
      setTodo(revisedTask);
      setIsLoaded(true);
    })
  }

  const gettingId = (data) => {
    setGetId(data);
    console.log(data);
  }

  const handleSignUp = (userData) => {
    console.log(userData);
    fetch('https://todo-e6d84-default-rtdb.firebaseio.com/user.json', {
      method: 'POST',
      body: JSON.stringify(userData)
    }).then((response) => {
      return response.json();
    }).then((data) => {
      console.log(data);
    })
  }

  const todos = todo.map((elem) => {
    return <Todo
      key={elem.id}
      id={elem.id}
      task={elem.task}
      handleDelete={handleDeleteTodo}
      gettingId={gettingId}
    />
  })
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Home onSignUp={handleSignUp} />
          </Route>

          <Route path="/navigation">
            <Navigation getTodos={fetchTodo} />
          </Route>

          <Route path="/create">
            <Navigation getTodos={fetchTodo} />
           {isLoaded && <Create addTodo={handleAddTodo} />} 
           {!isLoaded && <div className="loading">Loading...</div>}
          </Route>

          <Route path="/edit">
            <Navigation getTodos={fetchTodo} />
            {isLoaded && <Edit handleEditedTask={handleEditedTask} />}
            {!isLoaded && <div className="loading">Loading...</div>}
          </Route>

          <Route path="/todolist">
            <Navigation getTodos={fetchTodo} />
            {isLoaded && <TodoList todos={todos} />}
            {!isLoaded && <div className="loading">Loading...</div>}
            
          </Route>

        </Switch>
      </div>

    </Router>
  );
}

export default App;
