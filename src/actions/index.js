import { FETCH_USER, FETCH_PREVIEW, FETCH_MAIN_CATEGORIES, FETCH_USER_PORTALS, ADD_PORTAL_SUCCESS } from './types';
import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000/qux';

export const fetchUser = () => dispatch => {
    const name = localStorage.getItem('loggedinUser') || '';
    dispatch({ type: FETCH_USER, payload: name });
}

export const loginUser = LoginData => async dispatch => {
    let userData = {
        user_email: LoginData.username,
        user_password: LoginData.password
    };
    let formData = new FormData();
    for(let k in userData) {
        formData.append(k, userData[k]);
    }
    try {
        const user = await axios.post(`${baseURL}/login`, formData);
        if(user.data.success) {
            console.log(user.data.data);
            localStorage.setItem('loggedinUser', user.data.data.user_name);
            localStorage.setItem('basic_token', user.data.data.token);
            alert('You are loggedin successfully');
        } else {
            alert('Email or password is invalid');
            return;
        }
    } catch (error) {
        throw error;
    }
    
    dispatch({ type: FETCH_USER, payload: LoginData });
}

export const logoutUser  = () => dispatch => {
    localStorage.clear();
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

export const fetchMainCategories = () => async dispatch => {
    try {
        let token = localStorage.getItem('basic_token') || null;
        let headers = {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Basic ${token}`,
            "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
        }
        const categories = await axios.get(`${baseURL}/portal/categories`, {
            headers
        });
        console.log(categories);
        dispatch({ type: FETCH_MAIN_CATEGORIES, payload: categories.data.data });
    } catch (error) {
        
    }
}

export const newPortalGeneration = data => async dispatch => {
    try {
        let mode = localStorage.getItem('editMode') || false;
        let token = localStorage.getItem('basic_token') || null;
        let headers = {
            'content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Basic ${token}`,
            "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH"
        }
        // insert mode
        if(!mode) {
            console.log('insert mode');
            const portal = await axios.post(`${baseURL}/portal/new`, data, {
                headers
            });
            console.log(portal);
            if(portal.data.data) {
                dispatch({ type: ADD_PORTAL_SUCCESS, payload: portal.data.data.success });
            } 
            if(!portal.data.data) {
                alert('Failed to add portal');
                dispatch({ type: ADD_PORTAL_SUCCESS, payload: portal.data.axiossuccess });
            }
        } else {
            // update mode
            let portal_id = localStorage.getItem('editID');
            let ids = JSON.parse(localStorage.getItem('subportalIDs'));
            data.portal_id = portal_id;
            data.subportalIDs = ids;
            const portal = await axios.post(`${baseURL}/portal/update`, data, {
                headers
            });
            console.log('update mode');
            console.log(portal);
            if(!portal.data.success) {
                alert(portal.data.data);
            }
            dispatch({ type: ADD_PORTAL_SUCCESS, payload: portal.data.success });
        }
    } catch (error) {
        throw error;
    }
}

export const fetchUserportals = () => async dispatch => {
    try {
        let token = localStorage.getItem('basic_token') || null;
        let headers = {
            'content-type': 'application/json',
            "Access-Control-Allow-Origin": "*",
            "Authorization": `Basic ${token}`
        }

        const portals = await axios.get(`${baseURL}/portal/user`, {
            headers
        });

        dispatch({ type: FETCH_USER_PORTALS, payload: portals.data.data });
    } catch (error) {
        throw error;
    }
}