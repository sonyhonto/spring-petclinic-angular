import { HttpErrorResponse } from "@angular/common/http";
import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "./auth.reducer";
import { counterReducer } from "../store-example/counter.reducer";

export interface HttpError {
  error: HttpErrorResponse;
  errorEffect: string;
}

export interface AppState {
  auth: AuthState;

  // cart: fromCart.CartState;
  // order: fromOrder.OrderState;
  // counter: number;
  // showcase: fromShowcase.ShowcaseState;
  // browse: fromBrowse.BrowseState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  // cart: fromCart.cartReducer,
  // order: fromOrder.orderReducer,
  // counter: counterReducer,
  // showcase: fromShowcase.showcaseReducer,
  // browse: fromBrowse.browseReducer
};
