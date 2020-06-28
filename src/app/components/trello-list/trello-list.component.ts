import { Component, OnInit, Input } from '@angular/core';

import { List } from '../../models/trello-list.model';

@Component({
  selector: 'app-trello-list',
  templateUrl: './trello-list.component.html',
  styleUrls: ['./trello-list.component.scss']
})
export class TrelloListComponent implements OnInit {

  @Input() list: List;

  constructor() {

  }

  ngOnInit(): void {

  }

  handleShowActionButton(title: string): boolean {
    const LIST_NAME = 'Todo';
    return title === LIST_NAME;
  }
}
