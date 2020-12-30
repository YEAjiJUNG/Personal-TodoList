import React from 'react';

function TodoList({todos}){
    return(
        <div className="TodoList">
            {todos.map(todo => {
                <ul>
                    <li>{todo}</li>
                </ul>
            })}
        </div>
    )

}   