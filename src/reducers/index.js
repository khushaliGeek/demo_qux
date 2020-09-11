import { combineReducers } from 'redux';
import authReducer from './authReducer';
import previewReducer from './previewReducer';

export default combineReducers({
    auth: authReducer,
    preview: previewReducer
});