import { HttpError } from "./app.reducers";
import * as AuthActions from './auth.actions';

export interface AuthState {
    authenticated: boolean;
    token: string;
    isActive: boolean;
    errors: Array<HttpError>;
    loading: boolean;
}

const initialState: AuthState = {
    authenticated: false,
    token: null,
    isActive: null,
    errors: [],
    loading: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {

        case (AuthActions.SIGN_IN):
            return {
                ...state,
                authenticated: true,
                token: action.payload.token
            };

        case (AuthActions.SIGN_OUT):
            return {
                ...state,
                authenticated: false,
                token: null
            };
        case (AuthActions.SIGN_UP):
            return {
                ...state,
                loading: true
            };
        default:
            return state;
    }
}
