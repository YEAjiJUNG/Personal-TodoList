import React from 'react';

import './TodoListItem.scss';

const TodoListItem = ({ todo }) => {
    const{ text } = todo;

    return(
        <div className="TodoListItem">
           <ul>
               <li>
               <div className="text">{text}</div>
               </li>
            </ul> 
            
           
        </div>
    )
}

export default TodoListItem;
