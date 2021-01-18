import React , { useState, useCallback }from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import cn from 'classnames';
import './TodoInsertListItem.scss';
import { withRouter } from 'react-router-dom';
import { removeTodo, modifyTodo } from '../../../_actions/user_action';
import TodoModifyBox from './TodoModifyBox'; 

const TodoInsertListItem = ({ todo, id, rendering, dummy }) => {
    const dispatch = useDispatch();

    const [body, setBody] = useState(todo.body);

    const [edittodo, setEdittodo] = useState(body);
    const [edit, setEdit] = useState(false);

    const onChange = useCallback(e => {
        setEdittodo(e.target.value);
    }, [])
  
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

    const test = ( ) => {
        setEdit(true);
    }

    const modify = (e) => {
        console.log("djdjdsjklsjkdls", edittodo)
        let body_ = {
            _id: todo._id,
            todo: edittodo
        }
        //setBody(edittodo);
        dispatch(modifyTodo(body_)).then(response => {
            if(response.payload.success){
                rendering(!dummy);
                console.log('modify success')
            } else {
                    alert('Error')
           }
        });

        setEdit(false);
    }

    return(
        <div className="TodoInsertListItem">
            <div className="checkbox">
                <MdCheckBoxOutlineBlank />
                <div className="text" onClick={test}>{body}</div>
                    <TodoModifyBox edittodo={edittodo} edit={edit} modify={modify} onChange={onChange}></TodoModifyBox>
            </div>
            <div className="remove" onClick={onRemove}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default withRouter(TodoInsertListItem);
