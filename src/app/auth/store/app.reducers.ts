import { HttpErrorResponse } from "@angular/common/http";
import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "./auth.reducer";
import { counterReducer } from "../store-example/counter.reducer";

export interface HttpError {
  error: HttpErrorResponse;
  errorEffect: string;
}

export interface AppState {
  // cart: fromCart.CartState;
  // order: fromOrder.OrderState;
  auth: AuthState;
  // counter: number;
  // showcase: fromShowcase.ShowcaseState;
  // browse: fromBrowse.BrowseState;
}

export const reducers: ActionReducerMap<AppState> = {
  // cart: fromCart.cartReducer,
  // order: fromOrder.orderReducer,
  auth: authReducer,
  // counter: counterReducer,
  // showcase: fromShowcase.showcaseReducer,
  // browse: fromBrowse.browseReducer
};