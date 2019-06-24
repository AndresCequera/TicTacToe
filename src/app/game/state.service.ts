import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface State {
  turn: string;
  message: string;
  movements: number;
  values: string[][];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _state$: BehaviorSubject<State>;

  constructor() {
    let initialState = {
      turn: 'PLAYERX',
      message: 'Turn of ',
      movements: 0,
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    };

    this._state$ = new BehaviorSubject(initialState);
  }

  get state$(): BehaviorSubject<State> {
    return this._state$;
  }

  get state(): State {
    return this._state$.getValue();
  }

  set state(state: State) {
    this._state$.next(state);
  }

  updateValue(row, col) {
    if (this.state.values[row][col] === '-' && this.state.message === 'Turn of ') {
      let newValue = this.state.turn === 'PLAYERX' ? 'X' : '0';
      let newTurn = this.state.turn === 'PLAYERX' ? 'PLAYER0' : 'PLAYERX';
      this.state.values[row][col] =  newValue;
      this.state.turn = newTurn;
      this.state.movements++;

      if (this.state.values[0][0] === newValue && this.state.values[0][1] === newValue && this.state.values[0][2] === newValue
        || this.state.values[1][0] === newValue && this.state.values[1][1] === newValue && this.state.values[1][2] === newValue
        || this.state.values[2][0] === newValue && this.state.values[2][1] === newValue && this.state.values[2][2] === newValue
        || this.state.values[0][0] === newValue && this.state.values[1][0] === newValue && this.state.values[2][0] === newValue
        || this.state.values[0][1] === newValue && this.state.values[1][1] === newValue && this.state.values[2][1] === newValue
        || this.state.values[0][2] === newValue && this.state.values[1][2] === newValue && this.state.values[2][2] === newValue
        || this.state.values[0][0] === newValue && this.state.values[1][1] === newValue && this.state.values[2][2] === newValue
        || this.state.values[0][2] === newValue && this.state.values[1][1] === newValue && this.state.values[2][0] === newValue
      ) {
        this.state.message = 'Winner ';
        this.state.turn = 'PLAYER' + newValue;
      }

      this._state$.next(this.state);
    }
  }

  reset() {
    this.state = {
      turn: 'PLAYERX',
      message: 'Turn of ',
      movements: 0,
      values: [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
      ]
    };
  }
}
