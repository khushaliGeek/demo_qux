import { FETCH_USER_PORTALS } from '../actions/types';

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER_PORTALS:
            return action.payload || 'failed';
        default:
            return state;
    }
}