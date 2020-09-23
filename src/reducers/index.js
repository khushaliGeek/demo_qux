import { combineReducers } from 'redux';
import authReducer from './authReducer';
import previewReducer from './previewReducer';
import mainCategoriesReducer from './mainCategoriesReducer';

export default combineReducers({
    auth: authReducer,
    preview: previewReducer,
    mainCategories: mainCategoriesReducer
});