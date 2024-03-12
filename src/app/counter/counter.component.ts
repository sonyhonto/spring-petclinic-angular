import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { decrement, increment, reset } from 'app/auth/store-example/counter.actions';
import { AppState } from 'app/auth/store/app.reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent {

  count$: Observable<number>

  constructor(private store: Store<{ count: number }>) {
    this.count$ = this.store.select('count');

    let x = {};

    this.store.select('count').subscribe(state => {
      console.log('count : ', state);
    });

    // console.log('this.store : ', this.store);
    // console.log(x = this.store);
  }

  increment() {
    this.store.dispatch(increment());
  }
  decrement() {
    this.store.dispatch(decrement());
  }
  reset() {
    this.store.dispatch(reset());
  }

}
