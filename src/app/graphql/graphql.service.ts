import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { InMemoryCache, ApolloLink, concat } from '@apollo/client/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {}

  createApollo() {
    const http = this.httpLink.create({ uri: 'http://localhost:4000/graphql' });
    const token = localStorage.getItem('id_token');
    const authLink = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
          token ? `bearer ${token}` : ''
        ),
      });
      return forward(operation);
    });

    this.apollo.create({
      link: concat(authLink, http),
      cache: new InMemoryCache(),
    });
  }
}
