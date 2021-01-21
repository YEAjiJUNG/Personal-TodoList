import React , { useState, useCallback }from 'react';
import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import {useDispatch} from 'react-redux';
import './TodoInsertListItem.scss';
import { withRouter } from 'react-router-dom';
import { removeTodo, modifyTodo } from '../../../_actions/user_action';
import TodoModifyBox from './TodoModifyBox'; 

const TodoInsertListItem = ({ todo, id, rendering, dummy }) => {
    console.log("ListItem useState");
    const dispatch = useDispatch();

    //const [body, setBody] = useState(todo.body);

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
        console.log("Remove!!", id, body_);
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
        console.log("modify");
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
    console.log("List item", todo.body, id);
    return(
        <div className="TodoInsertListItem">
                <div className="text" onClick={test}>{todo.body}</div>
                    <TodoModifyBox edittodo={edittodo} edit={edit} modify={modify} onChange={onChange}></TodoModifyBox>
            <div className="remove" onClick={onRemove}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default withRouter(TodoInsertListItem);
