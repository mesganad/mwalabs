import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Game } from "./games-list/games-list.component"

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {
  private baseURL = "http://localhost:5000/api"

  constructor(private http: HttpClient) { }

  public getGames(): Promise<Game[]> {
    //1. building the url
    const url: string = this.baseURL + "/games";

    //2. tell http service to make a request
    //3.convert observale result to a promise
    //4. convert the response to json
    //5. return the response
    //6. catch and handle errors
    return this.http.get(url).toPromise().then(this.gotGames).catch(this.handleError);
  }
  // public getGame():Promise<Game>{
  //   const url:string=this.baseURL+"/games/:gameId";
  //   return this.http.get(url).toPromise.then(this.gotGame);
  // }
  private gotGames(response: any) {
    console.log(response);
    return response as Game[];
  }
  private handleError(error: any): Game[] {
    console.log(error);
    return [];
  }

  public getGame(gameId: string): Promise<Game> {
    const url: string = this.baseURL + "/games/" + gameId;
    return this.http.get(url).toPromise().then(this.gotGame).catch(this.handleErr);
  }

  public deleteGame(id: number): Promise<any> {
    const url: string = this.baseURL + "/games/" + id;

    return this.http.delete(url).toPromise().then((response) => response).catch(this.handleErr);
  }

  public saveGame(game: Game): Promise<Game> {
    const url: string = this.baseURL + "/games/";
    return this.http.post(url, game).toPromise().then(response => response as Game).catch(this.handleErr);
  }

  private gotGame(response: any): Game {
    console.log(response);
    return response as Game;
  }
  private handleErr(error: any): Game {
    console.log(error);
    return new Game;
  }
}
