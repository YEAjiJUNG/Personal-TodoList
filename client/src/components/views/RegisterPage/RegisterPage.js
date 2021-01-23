import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';
import './RegisterPage.scss';


function RegisterPage(props){
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (e) => {
        setEmail(e.target.value)
    }
    const onPasswordHandler = (e) => {
        setPassword(e.target.value)
    }
    const onNameHandler = (e) => {
        setName(e.target.value)
    }
    const onConfirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value)
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }


        let body = {
            email: Email,
            name: Name,
            password: Password,
        }
        
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push('/login')
                } else{
                    alert('Failed to sign up')
                }
            })

    }

    return(
        <div className="outer">
            <form className="inner" onSubmit={onSubmitHandler}>
                <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" value={Email} onChange={onEmailHandler} placeholder="Enter Email"/>
                </div>
                <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" value={Name} onChange={onNameHandler} placeholder="Enter Name"/>
                </div>
                <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" value={Password} onChange={onPasswordHandler} placeholder="Enter Password"/>
                </div>
                <div className="form-group">
                <label>Confirm Password</label>
                <input type="password" className="form-control" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="Enter Confirm Password"/>
                </div>
                <br />
                <button type="submit" className="btn">
                    Sign up
                </button>
            </form>
    
        </div>
    )
}

export default withRouter(RegisterPage);