angular.module("meanGames").controller("GameController", GameController);

function _getStarRating(stars){
    return new Array(stars);
}

function GameController($routeParams, GameDataFactory){
    var vm = this;
    vm.title = "MEAN Games App";

    var id = $routeParams.id;

    GameDataFactory.getOneGame(id)
        .then(function(response){
            vm.game = response;
            vm.rating = _getStarRating(response.rate);
    });

    //for the update one 
    vm.isLoggedIn=function(){
        return AuthFactory.auth.isLoggedIn;
    }

    vm.deleteSuccess = null;
    vm.deleteGame = function(gameId){
        if(gameId){
            console.log(gameId);
            GameDataFactory.deleteOneGame(gameId).then(function(response){
                console.log(response)
                vm.deleteSuccess = true;

            }).catch(function(error){
                console.log(error);
            });
        }
    }
}

    //code for update
    //  vm.updateGame=function(){
    //      const editedGame={
    //          title:vm.game.title,
    //          year:vm.game.year,
    //          rate:vm.game.rate,
    //          price:vm.editedGamePrice,
    //          minPlayers:vm.editGameMinPlayars,
    //          maxPlayers:vm.editGameMaxPlayers,
    //          minAge:vm.editGameMinAge,
    //          designers:vm.game.designers,
    //          publisher:vm.game.publisher
    //      }
    //      GameDataFactory.replaceOneGame(gameId,editedGame).then(function(){

    //$route.reload();
  //  }).catch(function(error){
//console.log(error);
  //  });
        

    //  }
    
