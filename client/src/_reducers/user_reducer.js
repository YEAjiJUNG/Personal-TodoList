import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER,
    TODOLIST_USER,
    ADDTODO_USER,
    REMOVETODO_USER
} from '../_actions/types';

export default function reducer(state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return { ...state, register: action.payload}
        case AUTH_USER:
            return { ...state, userData: action.payload}
        case TODOLIST_USER :
            return { ...state, todoData: action.payload}
        case ADDTODO_USER : 
            return { ...state, addData: action.payload}
        case REMOVETODO_USER :
            return { ...state, removeData: action.payload}
        default:
            return state;

    }
}