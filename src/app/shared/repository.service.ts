import { AuthService } from './../auth/auth.service';
import { Apollo, gql } from 'apollo-angular';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {
  MutationCreateTask,
  MutationDeleteTask,
  MutationLogin,
  QueryTasks,
  Token,
} from '../types';

@Injectable({
  providedIn: 'root',
})
export class RepositoryService {
  listEmitter = new EventEmitter<boolean>();

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private router: Router
  ) {}

  login(email: string, password: string) {
    const mutationString = gql`
      mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          accessToken
          expiresIn
        }
      }
    `;

    this.apollo
      .mutate<MutationLogin>({
        mutation: mutationString,
        variables: {
          email,
          password,
        },
      })
      .pipe(
        map((result) => <Token>result.data?.login),
        catchError((err) => {
          console.error(`DEU RUIM: ${err}`);
          return EMPTY;
        }),
        tap((token: Token) => console.log(`jwt: ${JSON.stringify(token)}`)),
        map((token: Token) =>
          this.authService.setSession({
            accessToken: token.accessToken,
            expiresIn: token.expiresIn,
          })
        ),
        map((_) => {
          this.router.navigate(['home/tasks']);
        })
      )
      .subscribe();
  }

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
    this.apollo.mutate<MutationDeleteTask>({
      mutation: mutationString,
      variables: {
        id,
      },
    });
  }
}
