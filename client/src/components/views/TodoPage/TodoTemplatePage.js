import React from 'react';
import { withRouter } from 'react-router-dom';
import './TodoTemplatePage.scss';

function TodoTemplatePage({children}){

    return(
        <div className="TodoTemplate">
            <div className="app-title">Todo List</div>
            <div className="content"> {children} </div>
        </div>
    )
}

export default withRouter(TodoTemplatePage);