import { GraphqlService } from './graphql/graphql.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './login/login.module';
import { TaskModule } from './task/task.module';
import { LogoutComponent } from './logout/logout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, LogoutComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TaskModule,
    RouterModule,
    LoginModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(graphqlService: GraphqlService) {
    graphqlService.createApollo();
  }
}
