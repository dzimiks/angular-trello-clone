import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { List } from '../../models/trello-list.model';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import * as TrelloListActions from '../../store/trello-list.actions';

@Component({
  selector: 'app-trello-board',
  templateUrl: './trello-board.component.html',
  styleUrls: ['./trello-board.component.scss']
})
export class TrelloBoardComponent implements OnInit {

  board: Observable<{ lists: List[] }>;

  constructor(private store: Store<{ board: { lists: List[] } }>) {

  }

  ngOnInit(): void {
    this.board = this.store.select('board');
  }

  dragCard(
    droppableIdStart: string,
    droppableIdEnd: string,
    droppableIndexStart: number,
    droppableIndexEnd: number): void {
    this.store.dispatch(new TrelloListActions.DragCard({
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd
    }));
  }

  drop(event: CdkDragDrop<List>) {
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    if (previousContainer === currentContainer) {
      moveItemInArray(
        [...currentContainer.data.cards],
        previousIndex,
        currentIndex
      );

      this.dragCard(
        currentContainer.data.id,
        currentContainer.data.id,
        previousIndex,
        currentIndex
      );
    } else {
      transferArrayItem(
        [...previousContainer.data.cards],
        [...currentContainer.data.cards],
        previousIndex,
        currentIndex
      );

      this.dragCard(
        previousContainer.data.id,
        currentContainer.data.id,
        previousIndex,
        currentIndex
      );
    }
  }
}
