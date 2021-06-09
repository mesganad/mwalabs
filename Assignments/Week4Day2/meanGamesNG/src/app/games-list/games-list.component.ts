import { Component, Injectable, OnInit } from '@angular/core';

import { GamesDataService } from '../games-data.service';

export class Game{
  _id!:number;
  title!:string;
  price!:number;
  minPlayers!:number;
  maxPlayers!:number;
  minAge!:number;
}

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})

export class GamesListComponent implements OnInit {
 game: Game = new Game();
games:Game[]=[];


 constructor(private gamesDataService:GamesDataService){
   
 }
  
  ngOnInit(): void {
    this.getGames();
  }

  private getGames():void {


    this.gamesDataService.getGames().then((response)=>{this.gotGames(response)}).catch(this.handleError);
  }
  save(){
    console.log(this.game);
    this.gamesDataService.saveGame(this.game).then((newGame) => {
      console.log("Successfully saved: "+newGame);
        this.game = new Game();
        
      }).catch(err => {
        console.log(err);
      })
  }
  private gotGames(response:Game[]){
    this.games=response;

  }
  private handleError(error:any){
    console.log(error);

  }
}


