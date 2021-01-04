import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';
import './TodoList.scss';
import TodoListItem from './TodoListItem';
import {useLocation} from 'react-router-dom';


                                                                                                               
const TodoList = (props) => {
    const location = useLocation();

    useEffect(() => {
        console.log(location.state.detail)
    }, [location])
    

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
            님 안녕하세요!<br/>
            일정을 확인하세요:)
        </div>
        <TodoTemplatePage>
            <div className="TodoList">
                {todos.map((todo, id) =>(
                <TodoListItem key={id} todo={todo}></TodoListItem>
                ))}
            </div>
        </TodoTemplatePage>
        </div>
    )

}   

export default withRouter(TodoList);