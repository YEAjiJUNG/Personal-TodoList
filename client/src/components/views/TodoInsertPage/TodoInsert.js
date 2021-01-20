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
    console.log("useState");
    //console.log("Location Test", location.state);
    const [test_list, setTestList] = useState([]);
    const [dummy, setDummy] = useState(false);

    useEffect (() => {
        console.log("useEffect");
        let body = {}
    // Get Todo list
        dispatch(todolistUser(body)).then(response => {
            if(response.payload.listSuccess){
                console.log("UseEffect in TodoInsert", response.payload.todolist);
                setTestList(response.payload.todolist);
            } else {
                    alert('Error')
           }
        });
    }, [dummy]);
    //setDummy(0);
    // [TODO] Get Todolist from DB
    // TODOLIST
    const [todo, setTodo] = useState("");
    const add = (e) => {
        e.preventDefault();
        let body = {
            todo: todo
        }
        dispatch(addTodo(body)).then(response => {
           if(response.payload.success){
               console.log("Before Dummy");
                setDummy(!dummy)
                console.log("After Dummy");
                setTodo("")
                console.log("After Todo")
           }
           else{
               alert('Error')
           }

        });
    }

    const onChange = useCallback(e => {
        setTodo(e.target.value);
    }, [])

    console.log("Before Rendering", test_list);
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
                <TodoInsertListItem key={id} id={id} todo={todo} rendering={setDummy} dummy={dummy}></TodoInsertListItem>
                ))}
            </div>
            <button className="button" onClick={() => {history.push({
             pathname: "/todolist"})}}>저장</button>
        </TodoTemplatePage>
    )
}

export default withRouter(TodoInsert);
