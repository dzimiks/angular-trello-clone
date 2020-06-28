import { Component, OnInit, Input } from '@angular/core';
import { List } from '../../models/trello-list.model';

import { Store } from '@ngrx/store';
import * as TrelloListActions from '../../store/trello-list.actions';

import { MatDialog } from '@angular/material/dialog';
import { TrelloModalComponent } from '../trello-modal/trello-modal.component';
import { ACTION_TYPES } from '../../store/trello-list.actions';
import { Card } from '../../models/trello-card.model';

@Component({
  selector: 'app-trello-card',
  templateUrl: './trello-card.component.html',
  styleUrls: ['./trello-card.component.scss']
})
export class TrelloCardComponent implements OnInit {

  @Input() index: number;
  @Input() listID: string;
  @Input() card: Card;

  constructor(
    private store: Store<{ board: { lists: List[] } }>,
    public dialog: MatDialog
  ) {

  }

  ngOnInit(): void {

  }

  deleteCard(): void {
    this.store.dispatch(new TrelloListActions.DeleteCard({
      cardID: this.card.id,
      listID: this.listID
    }));
  }

  updateCard(): void {
    this.openDialog();
  }

  getText(): string {
    const CHAR_LIMIT = 200;
    const cardText = this.card.text;
    return cardText.length > CHAR_LIMIT ? `${cardText.substring(0, CHAR_LIMIT - 3)}...` : cardText;
  }

  openDialog(): void {
    this.dialog.open(TrelloModalComponent, {
      width: '500px',
      data: {
        listID: this.listID,
        cardID: this.card.id,
        title: this.card.title,
        text: this.card.text,
        type: ACTION_TYPES.UPDATE_CARD
      }
    });
  }
}
