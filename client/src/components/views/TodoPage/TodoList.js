import React, { useState } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';
import './TodoList.scss';
import TodoListItem from './TodoListItem';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { todolistUser } from '../../../_actions/user_action';


const TodoList = (props) => {
    const dispatch = useDispatch();

    const [todolist, setTodolist] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => { 
        let body = {}
        
        dispatch(todolistUser(body))
            .then(response => {
                if(response.payload.listSuccess){
                    setName(response.payload.name);
                    setTodolist(response.payload.todolist);
                } else{
                    alert('Error')
                }
            })
    }, [dispatch])
    
    const onClickHandler = () => {
        axios.get('/api/users/logout')
        .then(response => {
            if(response.data.success){
                props.history.push('/');
            }
            else{
                alert('로그아웃 하는데 실패 했습니다.')
            }
        })
    }

    return(
        <div>
        <button title="Go to Todo List" className="hello" onClick={() => props.history.push("/todolist")}>{name}</button>
            <button title="logout" className="bye" onClick ={onClickHandler}>logout</button>
        <TodoTemplatePage>
            <div className="TodoList">
                {todolist.map((todo, id) =>(
                <TodoListItem key={id} todo={todo}></TodoListItem>
                ))}
                 <button className="button" onClick={() => props.history.push("/todoedit")}>편집</button>
            </div>
        </TodoTemplatePage>
        </div>
    )                
}
    

export default withRouter(TodoList);
