import React, { useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import '../TodoPage/TodoTemplatePage.css';
import TodoTemplatePage from '../TodoPage/TodoTemplatePage';
import {MdAdd} from 'react-icons/md';

function TodoInsert(props){
    const dispatch = useDispatch();

    const [TodoList, setTodoList] = useState("");

    const onTodoListHandler = (e) => {
        setTodoList(e.target.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();//페이지 리프레시 막아준다
    }

    return(
        <TodoTemplatePage>
            <form className="TodoInsert">
                <input value={TodoList} onChange={onTodoListHandler} placeholder="할 일을 입력하세요" />
                <button type="submit">
                    <MdAdd />
                </button>
            </form>
        </TodoTemplatePage>
    )
}

export default withRouter(TodoInsert);