import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task, Query } from '../../types';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.css'],
})
export class TaskListaComponent implements OnInit {
  tasks!: Observable<Task[]>;

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.tasks = this.apollo
      .watchQuery<Query>({
        query: gql`
          query allTasks {
            allTasks {
              id
              userId
              name
              description
              completed
              user
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.allTasks));
  }
}
