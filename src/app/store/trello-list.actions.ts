import { Action } from '@ngrx/store';
import { Card } from '../models/trello-card.model';

export const ACTION_TYPES = {
  ADD_CARD: 'ADD_CARD',
  DELETE_CARD: 'DELETE_CARD',
  UPDATE_CARD: 'UPDATE_CARD',
  DRAG_CARD: 'DRAG_CARD',
};

export class AddCard implements Action {
  readonly type = ACTION_TYPES.ADD_CARD;

  constructor(public payload: { listID: string, newCard: Card }) {

  }
}

export class DeleteCard implements Action {
  readonly type = ACTION_TYPES.DELETE_CARD;

  constructor(public payload: { listID: string, cardID: string }) {

  }
}

export class UpdateCard implements Action {
  readonly type = ACTION_TYPES.UPDATE_CARD;

  constructor(public payload: { listID: string, cardID: string, title: string, text: string }) {

  }
}

export class DragCard implements Action {
  readonly type = ACTION_TYPES.DRAG_CARD;

  constructor(public payload: {
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number
  }) {

  }
}

export type ListActions = AddCard | DeleteCard | UpdateCard | DragCard;
