import { combineReducers } from 'redux';
import authReducer from './authReducer';
import previewReducer from './previewReducer';
import mainCategoriesReducer from './mainCategoriesReducer';
import userPortalsReducer from './userPortalsReducer';
import addPortalReducer from './addPortalReducer';

export default combineReducers({
    auth: authReducer,
    preview: previewReducer,
    mainCategories: mainCategoriesReducer,
    userPortals: userPortalsReducer,
    addPortal: addPortalReducer
});