import React, { useCallback, useState } from 'react';
import { withRouter } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../TodoPage/TodoTemplatePage.css';
import TodoTemplatePage from '../TodoPage/TodoTemplatePage';
import TodoInsertListItem from './TodoInsertListItem';
import {MdAdd, MdAirlineSeatIndividualSuite} from 'react-icons/md';
import './TodoInsert.scss';

function TodoInsert(){
    const history = useHistory();
    const location = useLocation();
    // [TODO] Get Todolist from DB
    // TODOLIST
    const [todo, setTodo] = useState("");
    console.log("First", TodoList);
    const add = () => {
            console.log("TEST", todo);
            location.state.todolist.push({"body": todo});
            //setTmpList(location.state.todolist);
            setTodoList(location.state.todolist);
            console.log("ADDing", TodoList);
    }

    const onChange = useCallback(e => {
        setTodo(e.target.value);
    }, [])

    console.log("List:", TodoList);
    return(
        <TodoTemplatePage>
            <form className="TodoInsert" onSubmit={add}>
                <input placeholder="할 일을 입력하세요" value={todo} onChange={onChange}/>
                <button type="submit">
                    <MdAdd />
                </button>
            </form>
            <div className="TodoInsertList">
                {TodoList.map((todo, id) =>(
                <TodoInsertListItem key={id} todo={todo}></TodoInsertListItem>
                ))}
            </div>
            <button className="button" onClick={() => {history.push({
             pathname: "/todolist"})}}>저장</button>
        </TodoTemplatePage>
    )
}

export default withRouter(TodoInsert);