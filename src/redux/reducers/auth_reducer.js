import * as actionTypes from '../actions';

// Define initialState
const initialState = {
    isAuth: localStorage.getItem('isAuth') ? localStorage.getItem('isAuth') : false,
    accountName: localStorage.getItem('accountName') ? localStorage.getItem('accountName') : null,
    accountEmail: localStorage.getItem('accountEmail') ? localStorage.getItem('accountEmail') : null
}

// Define the Auth Reducer
export default function auth_reducer(state = initialState, action) {
    switch (action.type) {
        
        // Auth: Create Account
        case actionTypes.Create_Account:
            localStorage.removeItem('isAuth');
            localStorage.removeItem('accountName');
            localStorage.removeItem('accountEmail');
            localStorage.removeItem('previousQuizzes');
            localStorage.setItem('isAuth', true);
            localStorage.setItem('accountName', action.accountName);
            localStorage.setItem('accountEmail', action.accountEmail);
            return {
                ...state,
                isAuth: action.isAuth,
                accountName: action.accountName,
                accountEmail: action.accountEmail,
            }
        
        // Auth: Logout Account
        case actionTypes.Logout_Account:
            localStorage.removeItem('isAuth');
            localStorage.removeItem('accountName');
            localStorage.removeItem('accountEmail');
            localStorage.removeItem('previousQuizzes');
            return {
                ...state,
                isAuth: false,
                accountName: null,
                accountEmail: null,
            }
        
        // Auth: Default
        default:
            return state;
    }
};
