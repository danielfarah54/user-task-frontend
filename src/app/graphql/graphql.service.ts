import { setContext } from '@apollo/client/link/context';
import { HttpLink } from 'apollo-angular/http';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';

import { HeadersService } from './../auth/headers.service';

const uri = 'http://localhost:4000/graphql';

@Injectable({
  providedIn: 'root',
})
export class GraphqlService {
  constructor(
    private apollo: Apollo,
    private httpLink: HttpLink,
    private headersService: HeadersService
  ) {}

  createApollo() {
    const basic = setContext((operation, context) => ({
      headers: {
        Accept: 'charset=utf-8',
      },
    }));

    const auth = setContext(async (operation, context) => {
      let token = localStorage.getItem('id_token');

      if (token === null) {
        await this.headersService.fetchRefreshToken();
        token = localStorage.getItem('id_token');
      }

      if (token === null) {
        return {};
      } else {
        return {
          headers: {
            Authorization: `bearer ${token}`,
          },
        };
      }
    });

    const link = ApolloLink.from([
      basic,
      auth,
      this.httpLink.create({ uri, withCredentials: true }),
    ]);
    const cache = new InMemoryCache({});

    this.apollo.create({
      link,
      cache,
    });
  }
}
