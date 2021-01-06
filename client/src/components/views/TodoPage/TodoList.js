import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';
import './TodoList.scss';
import TodoListItem from './TodoListItem';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import {useHistory} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { todolistUser } from '../../../_actions/user_action';

const TodoList = () => {
    const location = useLocation();
    const history = useHistory();
//get
    const dispatch = useDispatch();

    const [todolist, setTodolist] = useState([]);
    const [name, setName] = useState("");
     
    useEffect(() => {
        let body = {
            email: location.state.email
        }

        //dispatch이용해서 action취할 것이다. 그 action이름 loginUser
        dispatch(todolistUser(body))
            .then(response => {
                if(response.payload.listSuccess){
                    setName(response.payload.name);
                    setTodolist(response.payload.todolist);
                } else{
                    alert('Error')
                }
            })
    }, [])
    

    console.log(name, todolist);
    return(
        <div>
        <div className="hello">
            <b>{name}</b>님 안녕하세요!<br/>
            일정을 확인하세요:)
        </div>
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
