import React from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoInsertListItem.scss';
import { withRouter } from 'react-router-dom';

const TodoInsertListItem = ({ todo }) => {
    const{ body } = todo;

    return(
        <div className="TodoInsertListItem">
            <div className="checkbox">
                <MdCheckBoxOutlineBlank />
                <div className="text">{body}</div>
            </div>
            <div className="remove">
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default withRouter(TodoInsertListItem);
