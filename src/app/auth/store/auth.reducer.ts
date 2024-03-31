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
    token: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBMSIsImF1dGhvcml0aWVzIjoiW1JPTEVfQURNSU4sIFJPTEVfT1dORVJfQURNSU4sIFJPTEVfVkVUX0FETUlOXSIsImV4cCI6MTkyNzE4MjQxNX0.GxhZqsw3oeeX4VkxrzBHyyx80dTf0-35AAA-ajvpVP4',
    isActive: null,
    errors: [],
    loading: false
};

const jwt: string = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBMSIsImF1dGhvcml0aWVzIjoiW1JPTEVfQURNSU4sIFJPTEVfT1dORVJfQURNSU4sIFJPTEVfVkVUX0FETUlOXSIsImV4cCI6MTkyNzE4MjQxNX0.GxhZqsw3oeeX4VkxrzBHyyx80dTf0-35AAA-ajvpVP4';
export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case (AuthActions.SIGN_IN):
            return {
                ...state,
                authenticated: true,
                token: jwt
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
        case (AuthActions.SIGN_UP_SUCCESS):
            return {
                ...state,
                errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
                loading: false
            };

        case (AuthActions.SIGN_IN_SUCCESS):
            return {
                ...state,
                authenticated: true,
                errors: [...state.errors.filter(error => error.errorEffect !== action.payload.effect)],
                loading: false
            };

        case (AuthActions.AUTH_ERROR):
            const errors = [...state.errors];
            const index = errors.findIndex(error => error.errorEffect === action.payload.errorEffect);
            if (index !== -1) {
                errors[index] = action.payload;
            } else {
                errors.push(action.payload);
            }
            return {
                ...state,
                loading: false,
                errors
            };

        case (AuthActions.SIGN_OUT_SUCCESS):
            return initialState;

        case (AuthActions.FETCH_VERIFICATION_STATUS_SUCCESS):
            return {
                ...state,
                isActive: action.payload
            };
        default:
            return state;
    }
}
