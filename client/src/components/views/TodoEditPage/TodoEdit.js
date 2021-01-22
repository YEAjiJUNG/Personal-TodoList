import React, { useCallback, useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import TodoTemplatePage from '../TodoPage/TodoTemplatePage';
import TodoEditListItem from './TodoEditListItem';
import {MdAdd} from 'react-icons/md';
import './TodoEdit.scss';
import '../TodoPage/TodoTemplatePage.scss';
import { addTodo, todolistUser } from '../../../_actions/user_action';

function TodoEdit(props){
    const history = useHistory();
    const dispatch = useDispatch();

    const [test_list, setTestList] = useState([]);
    const [dummy, setDummy] = useState(false);
    const [ name , setName] = useState("");

    useEffect (() => {
        let body = {}
    
        dispatch(todolistUser(body)).then(response => {
            if(response.payload.listSuccess){
                setTestList(response.payload.todolist);
                setName(response.payload.name);
            } else {
                    alert('Error')
           }
        });
    }, [dummy, dispatch]);
    
    const [todo, setTodo] = useState("");
    const add = (e) => {
        e.preventDefault();
        let body = {
            todo: todo
        }
        dispatch(addTodo(body)).then(response => {
           if(response.payload.success){
                setDummy(!dummy)
                setTodo("")
           }
           else{
               alert('Error')
           }

        });
    }

    const onChange = useCallback(e => {
        setTodo(e.target.value);
    }, [])

    return(
        <div>
            <button title="Go to Todo List" className="hello" onClick={() => {props.history.push("/todolist")}}>{name}</button>
            <TodoTemplatePage>
            <form className="TodoEdit" onSubmit={add}>
                <input placeholder="할 일을 입력하세요" value={todo} onChange={onChange}/>
                <button type="submit" >
                    <MdAdd />
                </button>
            </form>
            <div className="TodoEditList">
                {test_list.map((todo, id) =>(
                <TodoEditListItem key={id} id={id} todo={todo} rendering={setDummy} dummy={dummy}></TodoEditListItem>
                ))}
            </div>
            <button className="button" onClick={() => {history.push({
             pathname: "/todolist"})}}>저장</button>
        </TodoTemplatePage>
        </div>
        
    )
}

export default withRouter(TodoEdit);
