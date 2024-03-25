import { createAction, props } from "@ngrx/store";

export enum ActionTypes {
    SetLabel = '[Label Component] Set'
}
export const SetLabel = createAction(ActionTypes.SetLabel, props<{ addressField: string }>());


