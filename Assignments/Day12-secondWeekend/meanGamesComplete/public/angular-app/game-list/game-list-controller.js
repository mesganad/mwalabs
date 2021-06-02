angular.module("meanGames").controller("GamesController", GamesController);

function GamesController(GameDataFactory,$http,AuthFactory,$route){
    var vm = this;
    vm.title = "MEAN Games List";

    GameDataFactory.getAllGames().then(function(response){
            vm.games = response;
        });

       

        vm.addGame = function(){
            var postData = {
                title: vm.newGameTitle,
                price: vm.newGamePrice,
                year : vm.newGameYear,
                rate: vm.newGameRating,
                minPlayers: vm.newGameMinPlayers,
                maxPlayers: vm.newGameMaxPlayers,
                minAge: vm.newGameMinAge,
                designers: vm.newGameDesigner
            };
             
            if(vm.gameForm.$valid){

                GameDataFactory.addOneGame(postData).then(function(response){
                    console.log("Game added");
                    
                }).catch(function(error){
                    console.log(error);
                })
            }
            else {
                vm.isSubmitted = true;
                console.log("Form Validation Failed");
            }
        }

        vm.isLoggedIn = function(){
            if(AuthFactory.isLoggedIn){
                return true;
            }else {
                return false;
            }
        }

        
        vm.searchGame=function(){
            
            if(vm.gametitle){     

                $http.get("/api/games/search?search="+vm.gametitle).then(function(response){
                    vm.results=response.data;
                }).catch(function(err){

                })
           
        }
    }
}