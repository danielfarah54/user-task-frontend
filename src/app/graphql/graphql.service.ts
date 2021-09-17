import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { InMemoryCache } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(private apollo: Apollo, private httpLink: HttpLink) {}

  createApollo() {
    this.apollo.create({
      link: this.httpLink.create({ uri: 'http://localhost:4000/graphql' }),
      cache: new InMemoryCache(),
    });
  }
}
