

angular.module('tvShows', [])
.factory('tvDetails', function($rootScope,$cookies) {


   var showTitle;
   var bPath;
   var overview;
   var showID;
   var season;
   var episodes = [];
   var list = [];
   var topShows = [];

   theMovieDb.common.timeout = 2000;


 function get_episodes(){

  return episodes;

 }


 function load_top_shows(){

     theMovieDb.tv.getTopRated({}, successTS, errorTS)

 }

 function successTS(data) {

      realData = JSON.parse(data);
      topShows = realData["results"];
      //console.log(topShows);
      $rootScope.$emit('updatedTopShows',this.list);
  };


  function errorTS(data) {
     //console.log("Error callback: " + data);
    }; 


  function get_list() {

   theMovieDb.tv.getPopular({"id":1396}, successCB, errorCB);

  }

  get_list();

   function successCB(data) {

      realData = JSON.parse(data);
      this.list = realData["results"];
      //console.log(this.list);
      $rootScope.$emit('updatedList',this.list);
  };


  function errorCB(data) {
     //console.log("Error callback: " + data);
    }; 


  function load_season(){
    //console.log(season);
      theMovieDb.tvSeasons.getById({"id":showID, "season_number": season}, successSn, errorSn)
  }
  
  function successSn(data) {
      realData = JSON.parse(data);
      season = season + 1;
      episodes.push(realData);
      theMovieDb.tvSeasons.getById({"id":showID, "season_number": season}, successSn, errorSn)     
  };

  function errorSn(data) {
     $rootScope.$emit('updatedEps',episodes);
     //console.log("Season limit ... " + data);
     //console.log("Error callback: " + data);
    };


  function set_season(seasonNumber,ID){
    showID = ID;
    season = seasonNumber;
  }

  function set_title(title){
    //set_title = title;
    console.log("Title set");
  }

   function get_title(){
    //console.log(showTitle);
    return showTitle;
  }


  function get_backdrop(list,id){

    for(i=0;i<list.length;i++){
      if(list[i]['name']==id){
        bPath = list[i]['poster_path'];
        return bPath;
      }
    }
    return "";
  }

  function get_over(list,id){

  for(i=0;i<list.length;i++){
    if(list[i]['name']==id){
      overview = list[i]['overview'];
      return overview;
    }
  }
  return "";
}

 function get_rating(list,id){

  for(i=0;i<list.length;i++){
    if(list[i]['name']==id){
      rating = list[i]['vote_average'];
      return rating;
    }
  }
  return "";
}

  function get_id(list,id){

  for(i=0;i<list.length;i++){
    if(list[i]['name']==id){
      showID = list[i]['id'];
      return showID;
    }
  }
  return "";
}


function detailsCache(key,value){

  var now = new Date(),

  exp = new Date(now.getFullYear(), now.getMonth()+1, now.getDate());

  $cookies.put(key,value,{
    path:"/",
    expires: exp
  });
}


  return {
    set_title:set_title,
    set_season:set_season,
    get_title:get_title,
    get_backdrop:get_backdrop,
    get_over:get_over,
    get_rating:get_rating,
    get_list:get_list,
    get_id:get_id,
    load_season:load_season,
    get_episodes:get_episodes,
    load_top_shows:load_top_shows,
    detailsCache:detailsCache
    
  };
});