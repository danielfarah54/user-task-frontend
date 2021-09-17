import { SetHeadersService } from './../../auth/set-headers.service';
import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task, QueryTasks } from '../../types';

@Component({
  selector: 'app-task-lista',
  templateUrl: './task-lista.component.html',
  styleUrls: ['./task-lista.component.scss'],
})
export class TaskListaComponent implements OnInit {
  tasks!: Observable<Task[]>;

  constructor(
    private apollo: Apollo,
    private setHeadersService: SetHeadersService
  ) {}

  ngOnInit(): void {
    const httpOptions =this.setHeadersService.setHeaders();

    this.tasks = this.apollo
      .watchQuery<QueryTasks>({
        query: gql`
          query Query {
            tasks {
              id
              name
              description
              userId
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.tasks));
  }
}
