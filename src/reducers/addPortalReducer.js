import { ADD_PORTAL_SUCCESS } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case ADD_PORTAL_SUCCESS:
            return action.payload || 'failed';
        default:
            return state;
    }
}