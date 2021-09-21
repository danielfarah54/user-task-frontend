import { map } from 'rxjs/operators';
import { Apollo, gql } from 'apollo-angular';
import { Injectable, EventEmitter } from '@angular/core';

import { QueryTasks } from './../../types';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  listEmitter = new EventEmitter<boolean>();

  constructor(private apollo: Apollo) {}

  refreshList() {
    return this.apollo
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
