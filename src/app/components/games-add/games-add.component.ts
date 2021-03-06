import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { from } from 'rxjs';
import { Game } from '../../models/game.model'
import { Platform } from '../../models/platform.model'
import { GamesService } from '../../services/games.service'
import { AuthService } from '../../services/auth.service';
import { Status } from '../../models/status.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-games-add',
  templateUrl: './games-add.component.html',
  styleUrls: ['./games-add.component.scss']
})
export class GamesAddComponent implements OnInit {

  public userId: string;
  public platformsOptions: Platform[];
  public statusOptions: Status[];
  public game: Game = new Game();

  public addSuccess: boolean = false;
  public disableSaveButton: boolean = false;

  constructor(
    private gamesService: GamesService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.userId = this.authService.userCredentials.id;
    this.getPlatformsOptions();
    this.getStatusOptions();
  }

  addNewGame() {
    if (this.userId) {
      let addGame = from(this.gamesService.addNewGame(this.game, this.userId));

      addGame.subscribe(() => {
        this.disableSaveButton = true;
        this.addSuccess = true;

        setTimeout(() => {
          this.router.navigate(['/gameslist']);
        }, environment.appSettings.redirectDelay)

      });
    }
  }

  getPlatformsOptions() {
    return this.platformsOptions = this.gamesService.getPlatformOptions();
  }

  getStatusOptions() {
    return this.statusOptions = this.gamesService.getStatusOptions();
  }
}
