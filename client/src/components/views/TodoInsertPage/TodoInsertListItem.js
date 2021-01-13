import React , { useState }from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import cn from 'classnames';
import './TodoInsertListItem.scss';
import { withRouter } from 'react-router-dom';
import { removeTodo } from '../../../_actions/user_action';

const TodoInsertListItem = ({ todo, id, rendering, dummy }) => {
    const{ body } = todo;
    const dispatch = useDispatch();
  
    const onRemove = () => {
        let body_ = {
            data: {
                index: id
            }
        }
        //console.log("Remove!!", id, body_);
        dispatch(removeTodo(body_)).then(response => {
            if(response.payload.success){
               // console.log(response.payload.email);
                rendering(!dummy);
                console.log('remove success')
            } else {
                    alert('Error')
           }
        });


    }

    return(
        <div className="TodoInsertListItem">
            <div className="checkbox">
                <MdCheckBoxOutlineBlank />
                <div className="text">{body}</div>
            </div>
            <div className="remove" onClick={onRemove}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default withRouter(TodoInsertListItem);
