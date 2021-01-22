import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import TodoList from './components/views/TodoPage/TodoList';
import TodoEdit from './components/views/TodoEditPage/TodoEdit';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Auth(LoginPage, false)} />  
          <Route path="/register" component={Auth(RegisterPage, false)} />
          <Route path="/todolist" component={Auth(TodoList, true)} />
          <Route path="/todoedit" component={Auth(TodoEdit, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
