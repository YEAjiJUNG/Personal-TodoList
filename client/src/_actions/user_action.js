import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    TODOLIST_USER,
    ADDTODO_USER,
    REMOVETODO_USER
} from './types';

export function loginUser(dataTosubmit){

    const request = axios.post('/api/users/login', dataTosubmit)
        .then(response =>  response.data) 

    return {
        type: LOGIN_USER ,
        payload: request
    }
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
    const request = axios.get('/api/users/auth')
        .then(response =>  response.data)

    return {
        type: AUTH_USER ,
        payload: request
    }
}
