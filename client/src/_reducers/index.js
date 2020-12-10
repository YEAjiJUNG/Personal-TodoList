import { combineReducers } from 'redux';
import user from './user_reducer';
//여러 reducer가 존재하는데 combineReducer을 이용해서 rootReducer에서 하나로 합쳐준다.
const rootReducer = combineReducers({
    user
})

export default rootReducer;