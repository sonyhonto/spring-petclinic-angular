import { HttpErrorResponse } from "@angular/common/http";
import { ActionReducerMap } from "@ngrx/store";
import { AuthState, authReducer } from "./auth.reducer";

export interface HttpError {
    error: HttpErrorResponse;
    errorEffect: string;
}

export interface AppState {
    // cart: fromCart.CartState;
    // order: fromOrder.OrderState;
    // auth: fromAuth.AuthState;
    // showcase: fromShowcase.ShowcaseState;
    // browse: fromBrowse.BrowseState;
}


export interface AppState {
    // cart: fromCart.CartState;
    // order: fromOrder.OrderState;
    auth: AuthState;
    // showcase: fromShowcase.ShowcaseState;
    // browse: fromBrowse.BrowseState;
  }
  
  export const reducers: ActionReducerMap<AppState> = {
    // cart: fromCart.cartReducer,
    // order: fromOrder.orderReducer,
    auth: authReducer,
    // showcase: fromShowcase.showcaseReducer,
    // browse: fromBrowse.browseReducer
  };
  