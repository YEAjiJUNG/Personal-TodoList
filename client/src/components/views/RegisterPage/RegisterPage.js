import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { withRouter } from 'react-router-dom';


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
        e.preventDefault();//페이지 리프레시 막아준다


        let body = {
            email: Email,
            password: Password
        }
        //dispatch이용해서 action취할 것이다. 그 action이름 loginUser
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/') //login을 눌러 response받으면 /로 끝나는 루트페이지로 이동
                } else{
                    alert('Error')
                }
            })

    }

    return(
        <div style={{display: "flex", justifyContent: "center", alignItems: "center",  
            width: "100%", height: "100vh"}}>
            <form style={{ display:'flex', flexDirection:'column'}}
                onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler} />
                <label>Name</label>
                <input type="text" value={Name} onChange={onNameHandler} />
                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler} />
                <label>Confirm Password</label>
                <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
                <br />
                <button type="submit">
                    회원가입
                </button>
            </form>
    
        </div>
    )
}

export default withRouter(RegisterPage);