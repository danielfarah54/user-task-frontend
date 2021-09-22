import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';

import {
  MutationCreateTask,
  MutationDeleteTask,
  MutationUpdateTask,
  QueryTask,
  QueryTasks,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class TaskRepositoryService {
  listEmitter = new EventEmitter<boolean>();

  constructor(private apollo: Apollo) {}

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

  getTask(id: string) {
    const queryString = gql`
      query Query($id: Float!) {
        task(id: $id) {
          id
          name
          description
          userId
        }
      }
    `;

    return this.apollo
      .watchQuery<QueryTask>({
        query: queryString,
        variables: {
          id: parseFloat(id),
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.task),
        map((task) => task)
      );
  }

  updateTask(id: string, name: string, description: string) {
    const mutationString = gql`
      mutation Mutation($name: String!, $description: String!, $id: Float!) {
        updateTask(name: $name, description: $description, id: $id)
      }
    `;
    // console.log(`id: ${typeof id}, name: ${name}, description: ${description}`);

    this.apollo
      .mutate<MutationUpdateTask>({
        mutation: mutationString,
        variables: {
          name,
          description,
          id: parseFloat(id),
        },
      })
      .pipe(
        map((result) => result.data?.updateTask),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        map(() => this.listEmitter.emit(true))
      )
      .subscribe();
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
