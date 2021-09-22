import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth/auth.service';
import { MutationCreateTask, MutationDeleteTask, QueryTasks } from '../types';

@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryService {
  listEmitter = new EventEmitter<boolean>();

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {}

  createTask(name: string, description: string) {
    const mutationString = gql`
      mutation Mutation($name: String!, $description: String!) {
        registerTask(name: $name, description: $description)
      }
    `;
    this.apollo
      .mutate<MutationCreateTask>({
        mutation: mutationString,
        variables: {
          name,
          description,
        },
      })
      .pipe(
        map((result) => result.data?.registerTask),
        tap((c) => console.log('resultao:', c)),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((registerTask) => console.log(`registerTask: ${registerTask}`)),
        map(() => this.listEmitter.emit(true))
      )
      .subscribe();
  }

  getTasks() {
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

  deleteTask(id: number) {
    const mutationString = gql`
      mutation Mutation($id: Float!) {
        deleteTask(id: $id)
      }
    `;
    this.apollo
      .mutate<MutationDeleteTask>({
        mutation: mutationString,
        variables: {
          id,
        },
      })
      .pipe(
        map((result) => result.data?.deleteTask),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        map(() => this.listEmitter.emit(true))
      )
      .subscribe();
  }
}
