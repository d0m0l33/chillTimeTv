
var main = angular.module('main', ['tvShows','ngCookies']);

main.controller('MainController', ['tvDetails','$rootScope','$scope','$window','$location','$cookies', function(tvDetails,$rootScope,$scope,$window,$location,$cookies) {

 $scope.title = "Top Rated Tv Shows"
 $scope.title2 = "Popular Tv Shows"
 $scope.imagePath = theMovieDb.common["images_uri"];
 $scope.list = [];

 $window.onload = function() {
     $rootScope.$on('updatedList', function (event, data) {
     $scope.list = data; 
     $scope.$apply();

  });
 }; 


 /* generate movie details page for a single movie. Takes a movie id and cashes the movie attributes, to be used on the movie page */
  $scope.details_page = function(id){

    var desc_image = tvDetails.get_backdrop($scope.list,id); 
    var desc_summary = tvDetails.get_over($scope.list,id);
    var desc_rating = tvDetails.get_rating($scope.list,id);
    var desc_id = tvDetails.get_id($scope.list,id);

    tvDetails.detailsCache('title',id);
    tvDetails.detailsCache('backdrop',desc_image);
    tvDetails.detailsCache('overview',desc_summary);
    tvDetails.detailsCache('rating',desc_rating);
    tvDetails.detailsCache('showID',desc_id);
    window.location.href = "/details/"+id;
  }


}]);

main.controller('DetailsController', ['tvDetails','$rootScope','$scope','$window','$location','$cookies', function(tvDetails,$rootScope,$scope,$window,$location,$cookies) {

  $window.onload = function() {
    $scope.activeEpisode = 0;
    $scope.activeSeason = 0;

  };

  /* Obtain movie attributes previously cashed and display them on the moive details page */
  $scope.imagePath = theMovieDb.common["images_uri"];
  $scope.title = $cookies.get("title");
  $scope.backdrop = $cookies.get("backdrop");
  $scope.overview = $cookies.get("overview");
  $scope.rating = $cookies.get("rating");
  $scope.showID = $cookies.get("showID");

  tvDetails.set_season(1,$scope.showID);
  tvDetails.load_season();

  $scope.list = [];
  $scope.seasons = [];
  $scope.episodes = [];

  $rootScope.$on('updatedEps', function (event, data) {

    $scope.seasons = data;
    $scope.seasonNum = data.length;
    $scope.episodes = data[$scope.activeSeason]["episodes"];
    $scope.episode_image = $scope.episodes[$scope.activeEpisode]["still_path"];
    $scope.episode_summary = $scope.episodes[$scope.activeEpisode]["overview"];
    $scope.episode_title = $scope.episodes[$scope.activeEpisode]["name"];
    $scope.$apply();

  });

  $scope.update_season = function(number){

    $scope.activeSeason = number - 1;
    $scope.episodes = $scope.seasons[$scope.activeSeason]["episodes"];
    $scope.activeEpisode = 0;
    update_episode_view($scope.activeSeason,$scope.activeEpisode);
  }

  $scope.update_episode = function(number){

    $scope.activeEpisode = number - 1;
    update_episode_view($scope.activeSeason,$scope.activeEpisode);
  }

  function update_episode_view(seasonNum,episodeNum){

    $scope.episode_image = $scope.episodes[$scope.activeEpisode]["still_path"];
    $scope.episode_summary = $scope.episodes[$scope.activeEpisode]["overview"];
    $scope.episode_title = $scope.episodes[$scope.activeEpisode]["name"];
  }

}]);

