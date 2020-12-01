import {
    LOGIN_USER
} from '../_actions/types';

export default function(state={}, action) {
    //type이 많아질 때를 대비해 다른 type이 올때마다 다른 조치를 해야하기 때문에
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload}
            break;

        default:
            return state;

    }
}