import './App.css';
import React, { useState, useEffect } from 'react';

import Header from './My-Component/Header';
import Todos from './My-Component/Todos';
import AddTodo from './My-Component/AddTodo';
import Footer from './My-Component/Footer';
import About from './My-Component/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  let initTodos;
  if (localStorage.getItem("todos") === null) {
    initTodos = [];
  } else {
    initTodos = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])


  const onDelete = (todo) => {
    console.log("I am ondelete of todo", todo);
    // let index =todos.indexOf(todo);
    // todos.splice(index,1);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  //3. naya todo add karne ke liye function

  const addTodo = (title, desc) => {
    console.log('I am adding this todo', title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    } else {
      sno = todos[todos.length - 1].sno + 1;

    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);

  };

  return (
    <>


      <Router>
        <Header title="My Todos Lists" searchBar ={true}/>

        <Routes>
          <Route exact path="/" element={

            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>

          } />
          <Route exact path="/about" element={<About />} />

        </Routes>
      </Router>

      <Footer />

    </>
  );
}

export default App;