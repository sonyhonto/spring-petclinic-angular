/**
 * @author Sony Honto
 */

import { HttpErrorResponse } from "@angular/common/http";
import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "./auth.reducer";

export interface HttpError {
    error: HttpErrorResponse;
    errorEffect: string;
}

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};
