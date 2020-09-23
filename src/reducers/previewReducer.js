import { FETCH_PREVIEW } from '../actions/types';

export default function(state = null, action) {
    switch(action.type) {
        case FETCH_PREVIEW: 
            return action.payload;
        default:
            return state;
    }
}