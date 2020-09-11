import { FETCH_USER, FETCH_PREVIEW } from './types';

export const fetchUser = () => dispatch => {
    const name = localStorage.getItem('loggedinUser') || '';
    dispatch({ type: FETCH_USER, payload: name });
}

export const loginUser = LoginData => dispatch => {
    localStorage.setItem('loggedinUser', LoginData);
    dispatch({ type: FETCH_USER, payload: LoginData });
}

export const logoutUser  = () => dispatch => {
    localStorage.removeItem('loggedinUser');
    dispatch({ type: FETCH_USER, payload: null });
}

export const fetchPreview = () => dispatch => {
    const portalProfile = localStorage.getItem('portalProfile') || '';
    const portalBackground = localStorage.getItem('portalBackground') || '';
    const res = {
        portalProfile,
        portalBackground
    };
    dispatch({ type: FETCH_PREVIEW, payload: res });
}