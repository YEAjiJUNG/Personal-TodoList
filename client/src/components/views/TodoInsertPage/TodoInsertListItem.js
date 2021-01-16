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
import { removeTodo } from '../../../_actions/user_action';

const TodoInsertListItem = ({ todo, id, rendering, dummy }) => {
    const { body } = todo;
    const dispatch = useDispatch();

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
        console.log("TEST!!");
        setEdit(true);
    }

    return(
        <div className="TodoInsertListItem">
            <div className="checkbox">
                <MdCheckBoxOutlineBlank />
                <div className="text" onClick={test}>{body}</div>
                {edit? <div className="text"><input value={edittodo} onChange={onChange}/></div> : <div ></div>}
            </div>
            <div className="remove" onClick={onRemove}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    )
}

export default withRouter(TodoInsertListItem);
