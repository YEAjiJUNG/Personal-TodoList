import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import TodoList from './components/views/TodoPage/TodoList';
import TodoInsert from './components/views/TodoPage/TodoInsert';

//Route의 exact path는 경로가 완전히 일치할 때만 그 페이지로 이동
function App() {

  const [todos, setTodos] = useState([
    {
      id: 1,
      text: '리액트의 기초 알아보기',
      checked: true,
    },
    {
      id: 2, 
      text: '컴포넌트 스타일링해 보기',
      checked: true
    }
  ])

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />  
          <Route path="/login" component={Auth(LoginPage, false)} />
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/todolist" component={Auth(TodoList, true)} />
          <Route path="/todoupdate" component={Auth(TodoInsert, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;