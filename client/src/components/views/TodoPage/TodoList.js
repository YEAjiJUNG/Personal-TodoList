import React from 'react';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';
import './TodoList.scss';
import TodoListItem from './TodoListItem';



const TodoList = () => {

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
        <TodoTemplatePage>
            <div className="TodoList">
                {todos.map((todo, id) =>(
                <TodoListItem key={id} todo={todo}></TodoListItem>
                ))}
            </div>
        </TodoTemplatePage>
    )

}   

export default withRouter(TodoList);