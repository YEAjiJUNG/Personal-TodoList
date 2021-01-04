import React from 'react';
import { withRouter } from 'react-router-dom';
import './TodoTemplatePage.css';
import { useHistory } from 'react-router-dom';

function TodoTemplatePage({children}){

    const history = useHistory();

    return(
        <div className="TodoTemplate">
            <div className="app-title">일정 관리</div>
            <div className="content"> {children} </div>
        </div>
    )
}

export default withRouter(TodoTemplatePage);