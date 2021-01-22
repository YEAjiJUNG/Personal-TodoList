import {
    LOGIN_USER, 
    REGISTER_USER,
    AUTH_USER,
    TODOLIST_USER,
    ADDTODO_USER,
    REMOVETODO_USER
} from '../_actions/types';

export default function(state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            return { ...state, register: action.payload}
            break;
        case AUTH_USER:
            return { ...state, userData: action.payload}
            break; 
        case TODOLIST_USER :
            return { ...state, todoData: action.payload}
            break;
        case ADDTODO_USER : 
            return { ...state, addData: action.payload}
            break;
        case REMOVETODO_USER :
            return { ...state, removeData: action.payload}
            break;
        default:
            return state;

    }
}