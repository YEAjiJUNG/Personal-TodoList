import React from 'react';
import { withRouter } from 'react-router-dom';
import './TodoTemplatePage.css';
import './TodoInsert';

function TodoTemplatePage(){
    return(
        <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>
            <TodoInsert />
        </div>
    )
}

export default withRouter(TodoTemplatePage);