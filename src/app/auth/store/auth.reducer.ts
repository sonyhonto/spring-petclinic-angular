import { createReducer, on } from "@ngrx/store";
import { HttpError } from "./app.reducers";
import * as AuthActions from './auth.actions';
import { HttpParams } from "@angular/common/http";

export interface AuthState {
    authenticated: boolean;
    token: string;
    isActive: boolean;
    errors: Array<HttpError>;
    loading: boolean;
}

const initialState: AuthState = {
    authenticated: false,
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBMSIsImF1dGhvcml0aWVzIjoiW1JPTEVfQURNSU4sIFJPTEVfT1dORVJfQURNSU4sIFJPTEVfVkVUX0FETUlOXSIsImV4cCI6MTkyNzE4MjQxNX0.GxhZqsw3oeeX4VkxrzBHyyx80dTf0-35AAA-ajvpVP4', // null, 
    isActive: null,
    errors: [],
    loading: false
};

// const jwt: string = 'token';
const jwt: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBMSIsImF1dGhvcml0aWVzIjoiW1JPTEVfQURNSU4sIFJPTEVfT1dORVJfQURNSU4sIFJPTEVfVkVUX0FETUlOXSIsImV4cCI6MTkyNzE4MjQxNX0.GxhZqsw3oeeX4VkxrzBHyyx80dTf0-35AAA-ajvpVP4';

// export const authReducer = createReducer(
//     initialState,
//     on(AuthActions.tokenScore, state => ({ ...state, token: state.token + '.' })),
//     on(AuthActions.setTokenStore, (state, { token: thisToken }) => ({ ...state, token: thisToken })),
//     // on(AuthActions.SetToken, state => ({ ...state, token: state.token + '.'})),
// );


export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {

        case (AuthActions.SET_TOKEN_PARAMS):
            //changed
            return {
                ...state,
                // authenticated: false,
                token: action.params.token
            };

            case (AuthActions.SET_TOKEN):
                //changed
                return {
                    ...state,
                    // authenticated: false,
                    token: 'class [ SetToken ]'
                };

        default:
            return state;
    }
}



// export function authReducer(state = initialState, action: AuthActions.AuthActions) {
//     switch (action.type) {

//         case (AuthActions.SIGN_IN):
//             //changed
//             return {
//                 ...state,
//                 authenticated: true,
//                 token: jwt
//                 // token: token
//                 // token: 'token'
//             };
//         case (AuthActions.SIGN_OUT):
//             //changed
//             return {
//                 ...state,
//                 authenticated: false,
//                 token: null
//             };
//         case (AuthActions.SIGN_UP):
//             return {
//                 ...state,
//                 loading: true
//             };
//         case (AuthActions.SIGN_UP_SUCCESS):
//             return {
//                 ...state,
//                 errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
//                 loading: false
//             };

//         case (AuthActions.SIGN_IN_SUCCESS):
//             return {
//                 ...state,
//                 authenticated: true,
//                 errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
//                 loading: false
//             };

//         case (AuthActions.AUTH_ERROR):
//             const errors = [...state.errors];
//             const index = errors.findIndex(error => error.errorEffect === action.payload.errorEffect);
//             if (index !== -1) {
//                 errors[index] = action.payload;
//             } else {
//                 errors.push(action.payload);
//             }
//             return {
//                 ...state,
//                 loading: false,
//                 errors
//             };

//         case (AuthActions.SIGN_OUT_SUCCESS):
//             return initialState;

//         case (AuthActions.FETCH_VERIFICATION_STATUS_SUCCESS):
//             return {
//                 ...state,
//                 isActive: action.payload
//             };
//         default:
//             return state;
//     }
// }





// export function authReducer(state = initialState, action: AuthActions.AuthActions) {
//     switch (action.type) {

//         case (AuthActions.SIGN_OUT):
//             //changed
//             return {
//                 ...state,
//                 authenticated: false,
//                 token: null
//             };

//         case (AuthActions.SIGN_OUT_SUCCESS):
//             return initialState;

//         case (AuthActions.FETCH_VERIFICATION_STATUS_SUCCESS):
//             return {
//                 ...state,
//                 isActive: action.payload
//             };
//         default:
//             return state;
//     }
// }
