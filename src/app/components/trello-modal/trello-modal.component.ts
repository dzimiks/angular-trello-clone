import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { List } from '../../models/trello-list.model';
import * as TrelloListActions from '../../store/trello-list.actions';
import { Card } from '../../models/trello-card.model';
import { v4 as uuidv4 } from 'uuid';
import { ACTION_TYPES } from '../../store/trello-list.actions';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-trello-modal',
  templateUrl: './trello-modal.component.html',
  styleUrls: ['./trello-modal.component.scss']
})
export class TrelloModalComponent implements OnInit {

  titleFormControl = new FormControl(this.data.title, [
    Validators.required,
  ]);

  textFormControl = new FormControl(this.data.text, [
    Validators.required,
  ]);

  errorMatcher = new ErrorMatcher();

  constructor(
    private store: Store<{ board: { lists: List[] } }>,
    public dialogRef: MatDialogRef<TrelloModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      listID: string,
      cardID: string,
      title: string,
      text: string,
      type: string
    }) {
  }

  ngOnInit(): void {

  }

  handleModalAction(): void {
    if (this.data.type === ACTION_TYPES.ADD_CARD) {
      this.handleAddCard();
    } else {
      this.handleUpdateCard();
    }
  }

  handleAddCard(): void {
    const newCard = new Card(`card-${uuidv4()}`, this.data.title, this.data.text);

    this.store.dispatch(new TrelloListActions.AddCard({
      listID: this.data.listID,
      newCard
    }));

    this.onClose();
  }

  handleUpdateCard(): void {
    this.store.dispatch(new TrelloListActions.UpdateCard({
      listID: this.data.listID,
      cardID: this.data.cardID,
      title: this.data.title,
      text: this.data.text
    }));

    this.onClose();
  }

  handleDeleteCard(): void {
    this.store.dispatch(new TrelloListActions.DeleteCard({
      listID: this.data.listID,
      cardID: this.data.cardID
    }));

    this.onClose();
  }

  handleDisableSaveButton(): boolean {
    return this.data.title === '' || this.data.text === '';
  }

  handleDisableDeleteButton(): boolean {
    return this.data.type === ACTION_TYPES.ADD_CARD;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onInputChange(field: string, input: string): void {
    this.data[field] = input.trim();
  }
}

export class ErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
