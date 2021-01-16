import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    TODOLIST_USER,
    ADDTODO_USER,
    REMOVETODO_USER
} from './types';

//액션 생성 함수
export function loginUser(dataTosubmit){//dataTosubmit은 dispatch(loginUser(body))의 body를 파라미터로 받은 것

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response =>  response.data) //서버에서 다시 받은 response를 request에 저장

    return {
        type: LOGIN_USER ,
        payload: request
    }//action에서는 type과 response(여기서는 payload)을 넣어줘야한다.
    //이거를 reducer로 보내야한다.
}

export function registerUser(dataTosubmit){

    const request = axios.post('/api/users/register', dataTosubmit)
        .then(response =>  response.data) 

    return {
        type: REGISTER_USER ,
        payload: request
    }
}

export function addTodo(dataTosubmit) {
    const request = axios.put('/api/users/todoinsert', dataTosubmit)
        .then(response => response.data)
        
    return {
        type: ADDTODO_USER,
        payload: request
    }
}

export function removeTodo(dataTosubmit){
    const request = axios.delete('/api/users/todo', dataTosubmit)
        .then(response => response.data)

    return {
        type: REMOVETODO_USER,
        payload: request
    } 
}

export function modifyTodo(dataTosubmit) {
    console.log("Request", dataTosubmit);
    const request = axios.put('/api/users/todo', dataTosubmit)
        .then(response => response.data)

    return {
        type: ADDTODO_USER,
        payload: request
    }
}

export function todolistUser(dataTosubmit){

    const request = axios.get('/api/users/todolist', dataTosubmit)
        .then(response =>  response.data) 

    return {
        type: TODOLIST_USER ,
        payload: request
    }
}

export function auth(){
    //get method이므로 body부분이 필요없다.(파라미터)
    const request = axios.get('/api/users/auth')
        .then(response =>  response.data)

    return {
        type: AUTH_USER ,
        payload: request
    }
}
