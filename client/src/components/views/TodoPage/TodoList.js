import React from 'react';
import { withRouter } from 'react-router-dom';
import TodoTemplatePage from './TodoTemplatePage';

const TodoList = ({todos}) => {
    return(
        <div className="TodoList">
            <TodoTemplatePage>
            {todos.map(todo => {
                <ul>
                    <li>{todo}</li>
                </ul>
            })}
            </TodoTemplatePage>
        </div>
    )

}   

export default withRouter(TodoList);