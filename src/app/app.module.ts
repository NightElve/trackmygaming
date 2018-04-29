import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { GamesService } from './services/games.service';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [GamesService],
  bootstrap: [AppComponent]
})

export class AppModule { }
