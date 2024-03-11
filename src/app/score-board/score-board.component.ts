import { Component } from '@angular/core';
import { Store, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'app/auth/store-scoreboard/scoreboard.reducer';
import { Game, awayScore, homeScore, resetScore, setScores } from 'app/auth/store-scoreboard/scoreboard-page.actions';


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
  resetScore() {
    this.store.dispatch(resetScore());
  }
  // setScores(game: Game) {
  //   this.store.dispatch(setScores(<{ game: Game }>));
  // }

}
