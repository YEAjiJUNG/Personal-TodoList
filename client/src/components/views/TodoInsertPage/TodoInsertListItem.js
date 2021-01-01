import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoInsertListItem.scss';

const TodoInsertList = ({ todo }) => {
    const{ text, checked } = todo;

    return(
        <div className="TodoInsertListItem">
            <div className={cn('checkbox', {checked})} >
                {checked? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{text}</div>
            </div>
            <div className="remove">
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default TodoInsertListItem;
