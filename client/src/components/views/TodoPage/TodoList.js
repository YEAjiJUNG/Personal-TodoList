import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';
import './TodoList.scss';
import TodoListItem from './TodoListItem';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import { todolistUser } from '../../../_actions/user_action';

const TodoList = () => {
    const history = useHistory();
//get
    const dispatch = useDispatch();

    const [todolist, setTodolist] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        let body = {}
        
        //dispatch이용해서 action취할 것이다. 그 action이름 loginUser
        dispatch(todolistUser(body))
            .then(response => {
                if(response.payload.listSuccess){
                    setName(response.payload.name);
                    setEmail(response.payload.email);
                    setTodolist(response.payload.todolist);
                } else{
                    alert('Error')
                }
            })
    }, [])
    

    console.log(name, todolist, email);
    return(
        <div>
        <button title="Go to Todo List" className="hello" onClick={() => {history.push({
            pathname: "/todolistt"})}}>{name}</button>
        <TodoTemplatePage>
            <div className="TodoList">
                {todolist.map((todo, id) =>(
                <TodoListItem key={id} todo={todo}></TodoListItem>
                ))}
                 <button className="button" onClick={() => {history.push({
             pathname: "/todoinsert"})}}>편집</button>
            </div>
        </TodoTemplatePage>
        </div>
    )                
}
    

export default withRouter(TodoList);
