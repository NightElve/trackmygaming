import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/';
import { map } from "rxjs/operators";
import { AngularFireDatabase } from 'angularfire2/database';
import { Game } from '../models/game.model';
import { Platform } from '../models/platform.model'
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root',
})

export class GamesService {
  constructor(private db: AngularFireDatabase) { }

  getGameListByUserId(): Observable<Game[]> {
    return this.db.list<Game>('/games/R6vBhRITlaMF6aVDK4oUF3wXHXI3').valueChanges();
  }

  getGameListAndKeyByUserId(userId: string): Observable<any[]> {
    return this.db.list<Game>('/games/' + userId).snapshotChanges()
      .pipe(map(results => {
        return results.map(item => {
          const $key = item.payload.key;
          const data = {
            $key,
            ...item.payload.val()
          }
          return data;
        })
      }));
  }

  getGameDetails(gameKey: string, userId: string) {
    return this.db.database.ref("/games/" + userId + "/" + gameKey).once("value");
  }

  addNewGame(game: Game, userId: string) {
    return this.db.list('/games/' + userId).push(game).set({
      title: game.title,
      platform: game.platform,
      status: game.status,
      publisher: game.publisher,
      releasedate: Date.parse(game.releasedate.toString()),
    });
  }

  updateGameDetails(gameKey: string, game: Game, userId: string) {
    return this.db.database.ref("/games/" + userId + "/" + gameKey).update({
      title: game.title,
      platform: game.platform,
      status: game.status,
      publisher: game.publisher,
      releasedate: Date.parse(game.releasedateObject.toString()),
    });
  }

  deleteGame(gameKey: string, userId: string) {
    return this.db.database.ref().child("/games/" + userId).child(gameKey).remove();
  }

  getPlatformOptions() {
    type platforms = Array<Platform>
    const options: platforms = [
      { name: 'PS4', code: 0 },
      { name: 'Nintendo', code: 1 },
      { name: 'XBOX', code: 2 },
      { name: 'PC', code: 2 },
    ];

    return options;
  }

  getStatusOptions() {
    type status = Array<Status>
    const options: status = [
      { name: 'New', code: 0 },
      { name: 'In Progress', code: 1 },
      { name: 'Completed', code: 2 },
      { name: 'On Hiatus', code: 4 }
    ];

    return options;
  }
}