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
import TodoInsert from './components/views/TodoInsertPage/TodoInsert';
import TodoInsertListItem from './components/views/TodoInsertPage/TodoInsertListItem';

//Route의 exact path는 경로가 완전히 일치할 때만 그 페이지로 이동
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false)} />  
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/todolist" component={Auth(TodoList, true)} />
          <Route path="/todoinsert" component={Auth(TodoInsert, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
