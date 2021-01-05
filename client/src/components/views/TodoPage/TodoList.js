import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';
import './TodoList.scss';
import TodoListItem from './TodoListItem';
import { useDispatch } from 'react-redux';

import {useHistory} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { todolistUser } from '../../../_actions/user_action';

const TodoList = () => {
    const location = useLocation();
    const history = useHistory();

    const dispatch = useDispatch();

    const todos = [
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
    ]
    return(
        <div>
        <div className="hello">
            <b>{location.state.name}</b>님 안녕하세요!<br/>
            일정을 확인하세요:)
        </div>
        <TodoTemplatePage>
            <div className="TodoList">
                {todos.map((todo, id) =>(
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
