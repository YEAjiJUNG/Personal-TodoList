import React from 'react';
import './TodoEdit.scss';

const TodoModifyBox = ({ edittodo, edit, modify, onChange }) => {
    return (
        <form className="TodoModify" onSubmit={modify}>
            {edit? <div className="text"><input value={edittodo} onChange={onChange}/></div> : <div></div>}
        </form>
    )

}

export default TodoModifyBox;
