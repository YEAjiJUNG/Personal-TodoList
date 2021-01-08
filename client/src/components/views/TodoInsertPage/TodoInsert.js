import React, { useCallback, useState } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import '../TodoPage/TodoTemplatePage.css';
import TodoTemplatePage from '../TodoPage/TodoTemplatePage';
import TodoInsertListItem from './TodoInsertListItem';
import {MdAdd} from 'react-icons/md';
import './TodoInsert.scss';

function TodoInsert(props){
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const [TodoList, setTodoList] = useState("");

    const add = useCallback(
        text => {
            const todo = {
                text
            };
            setTodoList(location.state.todolist.concat(todo));
        },
        [location.state.todolist],
    )

    const onTodoListHandler = (e) => {
        setTodoList(e.target.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();//페이지 리프레시 막아준다
    }

    /* const todos = [
        {
          id: 1,
          text: '리액트의 기초 알아보기',
          checked: true,
        },
        {
            id:2,
            text:'컴포넌트 스타일링해 보기',
            checked: true,
        },
        {
            id:3,
            text:'일정 관리 앱 만들어 보기',
            checked: false,
        },
        {
            id:4,
            text:'일정 관리 앱 만들어 보기',
            checked: false,
        },
    ]
    */

    console.log(location.state.todolist)
    return(
        <TodoTemplatePage>
            <form className="TodoInsert">
                <input placeholder="할 일을 입력하세요" value={TodoList} onChange={onTodoListHandler}/>
                <button type="submit" onClick={add}>
                    <MdAdd />
                </button>
            </form>
            <div className="TodoInsertList">
                {location.state.todolist.map((todo, id) =>(
                <TodoInsertListItem key={id} todo={todo}></TodoInsertListItem>
                ))}
            </div>
            <button className="button" onClick={() => {history.push({
             pathname: "/todolist"})}}>저장</button>
        </TodoTemplatePage>
    )
}

export default withRouter(TodoInsert);