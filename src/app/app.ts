import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Header } from './components/header/header';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { checkToken } from './store/user/user.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`
  <router-outlet />
  `
,

})
export class App {
constructor(private store:Store<AppState>) {
    this.store.dispatch(checkToken());
  }
}
