import { Action, createReducer, on } from '@ngrx/store';
import * as ScoreboardPageActions from './scoreboard-page.actions';
import { Game } from './scoreboard-page.actions';

export interface State {
    home: number;
    away: number;
    addressField: string;
}

export const initialState: State = {
    home: 0,
    away: 0,
    addressField: '',
};


export const scoreboardReducer = createReducer(
    initialState,
    on(ScoreboardPageActions.homeScore, state => ({ ...state, home: state.home + 1 })),
    on(ScoreboardPageActions.awayScore, state => ({ ...state, away: state.away + 1 })),
    on(ScoreboardPageActions.addressFieldScore, state => ({ ...state, addressField: state.addressField + '.' })),
    on(ScoreboardPageActions.resetScore, state => ({ home: 0, away: 0 , addressField: ''})),
    // on(ScoreboardPageActions.setScores, (state, { game }) => ({ ...state, home: game.home, 
    //     away: game.away, addressField: game.addressField })), 
    // doesn't work
    // on(ScoreboardPageActions.setScores, (state, { game }) => ({home: game.home, away: game.away, addressField: game.addressField })),
    // doesn't work
    // on(ScoreboardPageActions.setScores, (state, game ) => ({ ...state, game })),
    // on(ScoreboardPageActions.setScores, (state, game ) => ({...state, home: game.home, away: game.away, addressField: game.addressField })),

    on(ScoreboardPageActions.setSimpleScores, (state, {home: home, away: away}) => ({ ...state, home: home, away: away }))
   
  );