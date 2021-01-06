import React from 'react';

import './TodoListItem.scss';

const TodoListItem = ({ todo }) => {
    const{ body } = todo;

    return(
        <div className="TodoListItem">
           <ul>
               <li>
               <div className="text">{body}</div>
               </li>
            </ul> 
            
           
        </div>
    )
}

export default TodoListItem;
