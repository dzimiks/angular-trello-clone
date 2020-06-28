import { Component, OnInit, Input } from '@angular/core';
import { TrelloModalComponent } from '../trello-modal/trello-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ACTION_TYPES } from '../../store/trello-list.actions';

@Component({
  selector: 'app-trello-action-button',
  templateUrl: './trello-action-button.component.html',
  styleUrls: ['./trello-action-button.component.scss']
})
export class TrelloActionButtonComponent implements OnInit {

  @Input() listID: string;
  @Input() cardsLength: number;

  constructor(public dialog: MatDialog) {

  }

  ngOnInit(): void {

  }

  getText(): string {
    return this.cardsLength > 0 ? 'Add another card' : 'Add a card';
  }

  updateCard(): void {
    this.openDialog();
  }

  openDialog(): void {
    this.dialog.open(TrelloModalComponent, {
      width: '500px',
      data: {
        listID: this.listID,
        title: '',
        text: '',
        type: ACTION_TYPES.ADD_CARD
      }
    });
  }
}
