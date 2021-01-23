import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './LoginPage.scss';

function LoginPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onClick = () => {
        props.history.push("/register");
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: Email,
            password: Password
        }
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess)
                    props.history.push('/todolist')
                else{
                    alert('Error')
                }
            })

    }

    return(
        <div className="outer">
            <form className="inner" onSubmit={onSubmitHandler}>

                <h2>Log in</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" onChange={onEmailHandler} placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={onPasswordHandler} />
                </div>

                <button type="submit" className="btn">Sign in</button>
                <button type="button" className="btn" onClick={onClick}>go to sign up!</button>
        
        </form>
        </div>
    )
}

export default withRouter(LoginPage);
