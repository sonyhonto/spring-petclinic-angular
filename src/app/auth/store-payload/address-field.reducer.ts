import { createReducer, on } from "@ngrx/store";
import { SetLabel } from "./address-field.actions";

// export interface AppState {
//     addressField: string;
// }
  
// export const initialState: AppState = {
//     addressField: 'initial state of address '
// }

export interface AddressState {
    addressField: string;
}
  
export const initialState: AddressState = {
    addressField: 'initial state of address '
}

const _reducer = createReducer(
    initialState,
    on(SetLabel, (state, { addressField }) => {
        return {
            ...state,
            addressField: addressField
        };
    })
);