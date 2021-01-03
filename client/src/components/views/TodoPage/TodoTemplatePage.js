import React from 'react';
import { withRouter } from 'react-router-dom';
import './TodoTemplatePage.css';

function TodoTemplatePage({children}){
    return(
        <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>
            <div className="content"> {children} </div>
            <button className="button" >편집</button>
        </div>
    )
}

export default withRouter(TodoTemplatePage);