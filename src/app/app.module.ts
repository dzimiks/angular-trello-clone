import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';

import { TrelloCardComponent } from './components/trello-card/trello-card.component';
import { TrelloListComponent } from './components/trello-list/trello-list.component';
import { TrelloBoardComponent } from './components/trello-board/trello-board.component';
import { TrelloActionButtonComponent } from './components/trello-action-button/trello-action-button.component';
import { TrelloModalComponent } from './components/trello-modal/trello-modal.component';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import listReducer from './store/trello-list.reducer';
import { localStorageSync } from 'ngrx-store-localstorage';

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: ['board'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    TrelloCardComponent,
    TrelloListComponent,
    TrelloBoardComponent,
    TrelloActionButtonComponent,
    TrelloModalComponent
  ],
  imports: [
    StoreModule.forRoot({ board: listReducer }, { metaReducers }),
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
