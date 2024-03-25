import { Component } from '@angular/core';
import { Store, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'app/auth/store-scoreboard/scoreboard.reducer';
import { Game, awayScore, homeScore, resetScore, addressFieldScore, setScores, setSimpleScores } from 'app/auth/store-scoreboard/scoreboard-page.actions';


@Component({
  selector: 'app-score-board',
  templateUrl: './score-board.component.html',
  styleUrls: ['./score-board.component.css']
})
export class ScoreBoardComponent {

  game$: Observable<State>;

  constructor(private store: Store<{ game: State }>) {
    this.game$ = this.store.select('game');

  }

  homeScore() {
    this.store.dispatch(homeScore());
  }
  awayScore() {
    this.store.dispatch(awayScore());
  }
  addressFieldScore() {
    this.store.dispatch(addressFieldScore());
  }
  resetScore() {
    this.store.dispatch(resetScore());
  }

  //  setScores(game: Game) {
  //   this.store.dispatch(setScores(<{ game: Game }>));
  // }

  // setScores(game: Game) {
  //   // this.store.dispatch(setScores(<{ game: Game }>)); // doesn't work
  //   this.store.dispatch(setScores({ game: game }));  // this doesn't function
  // }

  // set(){
  //   const game: Game = {
  //     home: 1,
  //     away: 1,
  //     addressField: '.'
  //   };

  //   this.setScores(game);
  // }

  setSimpleScores(home: number, away: number) {
    this.store.dispatch(setSimpleScores({ home: home, away: home }));
    // {home: number, away: number}
  }

}
