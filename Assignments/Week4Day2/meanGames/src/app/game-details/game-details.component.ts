import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { GamesDataService } from '../games-data.service';
import { Game } from '../games-list/games-list.component';
@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent implements OnInit {
  game: Game = {} as Game;
  deleteSuccess!:boolean;
  deleteFailure!:boolean;
  starRating!:number[];

  constructor(private gameDataService: GamesDataService, private route: ActivatedRoute,private location: Location) { }

  ngOnInit(): void {
    const gameId: string = this.route.snapshot.params.gameId;
    console.log("Game Id is :" + gameId);
    this.getGame(gameId);
  }

  private getGame(gameId: string): void {

    this.gameDataService.getGame(gameId).then((response) => this.gotGame(response)).catch(this.handleError);

  }
   deleteGame(): void {
    this.gameDataService.deleteGame(this.game._id).then((response) => {this.deleteSuccess=true})
    .catch((error)=>{this.deleteFailure=true});

  }


  goBack():void {
    this.location.back();
  }


  private gotGame(response: Game) {
    console.log(response);
    this.game = response;
  }
  private handleError(error: any) {
    console.log(error);

  }


}

