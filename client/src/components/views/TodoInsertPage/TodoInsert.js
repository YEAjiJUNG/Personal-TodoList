import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TodoTemplatePage from '../TodoPage/TodoTemplatePage';
import TodoInsertListItem from './TodoInsertListItem';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';
import '../TodoPage/TodoTemplatePage.css';
import { addTodo, todolistUser } from '../../../_actions/user_action';
import * as onRemove from '../TodoInsertPage/TodoInsertListItem';

function TodoInsert(){
    const history = useHistory();
    const dispatch = useDispatch();
    
    //console.log("Location Test", location.state);
    const [test_list, setTestList] = useState([]);
    const [email, setEmail] = useState("");
    useEffect (() => {
        let body = {}

    // Get Todo list
        dispatch(todolistUser(body)).then(response => {
            if(response.payload.listSuccess){
                setTestList(response.payload.todolist);
                setEmail(response.payload.email);
            } else {
                    alert('Error')
           }
        });
    }, []);
    // [TODO] Get Todolist from DB
    // TODOLIST
    const [todo, setTodo] = useState("");
    console.log("First", test_list);
    const add = () => {
        let body = {
            todo: todo
        }
        dispatch(addTodo(body)).then(response => {
            console.log("SUCCESS ADD TODO");
        });
        // Add Todo to DB
    }

    const onChange = useCallback(e => {
        setTodo(e.target.value);
    }, [])

    console.log("List:", test_list);
    return(
        <TodoTemplatePage>
            <form className="TodoInsert" onSubmit={add}>
                <input placeholder="할 일을 입력하세요" value={todo} onChange={onChange}/>
                <button type="submit" >
                    <MdAdd />
                </button>
            </form>
            <div className="TodoInsertList">
                {test_list.map((todo, id) =>(
                <TodoInsertListItem key={id} _id={todo._id} todo={todo} onRemove={onRemove}></TodoInsertListItem>
                ))}
            </div>
            <button className="button" onClick={() => {history.push({
             pathname: "/todolist"})}}>저장</button>
        </TodoTemplatePage>
    )
}

export default withRouter(TodoInsert);