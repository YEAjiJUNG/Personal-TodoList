import React , { useState, useCallback }from 'react';
import {
    MdRemoveCircleOutline,
} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import './TodoEditListItem.scss';
import { withRouter } from 'react-router-dom';
import { removeTodo, modifyTodo } from '../../../_actions/user_action';
import TodoModifyBox from './TodoModifyBox'; 

const TodoEditListItem = ({ todo, id, rendering, dummy }) => {
    const dispatch = useDispatch();

    const [edittodo, setEdittodo] = useState(todo.body);
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
        dispatch(removeTodo(body_)).then(response => {
            if(response.payload.success){
                rendering(!dummy);
            } else {
                    alert('Error')
           }
        });
    }

    const test = ( ) => {

        setEdit(true);
    }

    const modify = (e) => {
        let body_ = {
            _id: todo._id,
            todo: edittodo
        }
        
        dispatch(modifyTodo(body_)).then(response => {
            if(response.payload.success){
                rendering(!dummy);
            } else {
                    alert('Error')
           }
        });

        setEdit(false);
    }
    return(
        <div className="TodoEditListItem">
                <div className="text" onClick={test}>{todo.body}</div>
                    <TodoModifyBox edittodo={edittodo} edit={edit} modify={modify} onChange={onChange}></TodoModifyBox>
            <div className="remove" onClick={onRemove}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default withRouter(TodoEditListItem);
