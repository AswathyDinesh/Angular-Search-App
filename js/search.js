var app = angular.module("searchapp", [])

app.controller("AppCtrl", function ($scope,Film) {
	//$scope.films = Film;	
	$scope.selectedlist = [];
	$scope.searchText = '';
	
/*$scope.check = function() {
 console.log("hi");
         $scope.selectedlist.push({ name:'acsd',cast: 'qwer'});
};
*/
$scope.getSearchData = function(search) {
	console.log('in controller');
	if(search){
	console.log('in if statement');
		var index = 1;
		var temp = [];
		for(var i=0; i<Film.length; i++){
			if(Film[i].name.indexOf(search) != -1){
			    Film[i].cindex = index;
				temp.push(Film[i]);
				index ++;
			}	
		}
		$scope.films = temp;
	}

};
});

app.factory('Film', function () { 
      var data = [
		{ name:'A.I. Artificial Intelligence', cast: 'Haley Joel Osment', cindex : 0}, 
        { name:'ABCD 2', cast: 'Varun Dhawan', cindex : 0},
		{ name:'Aa Dekhen Zara', cast: 'Bipasha Basu', cindex : 0},
		{ name:'American Pie', cast: 'Jason Biggs', cindex : 0},
		{ name:'Cast Away', cast: 'Tom Hanks', cindex : 0},
        { name:'Babylon A.D.', cast: 'Vin Diesel', cindex : 0}, 
        { name:'Da Vinci Code', cast: 'Tom Hanks', cindex : 0}, 
        { name:'Deception', cast: 'Hugh Jackman', cindex : 0},
        { name:'Paranormal Activity 2', cast: 'Katie Feather', cindex : 0},
		{ name:'Life and Debt', cast: 'Jamaica Kinkaid', cindex : 0},
		{ name:'Little Children', cast: 'Kate Winslet', cindex : 0},
		{ name:'Saawariya', cast: 'Ranbir Kapoor', cindex : 0}
		
  ];
	  return data;
	});  

app.directive("find", function() {
  return {
    restrict: "E",
	scope : {
	         selectedlist :'=',
			 data : '=',
			 searchText : '=',
             getSearchData : '&'
			 },
    template:'<div class="searchContainer"><input class="searchBox" placeholder="Enter your search here" type = "text" ng-model = "searchText" ng-change="inputChanged()" ng-keydown="key($event)">'+
             '<ul style="position:absolute; z-index:10; width:100%; padding-top:5%;">'+
			 '<li class="suggestionList" ng-repeat = "x in data | filter: searchText" ng-click="additem(x)" ng-class="{highlight: x.cindex == focusindex}"> {{ x.name }} - {{ x.cast}}</li>'+ '</ul>'
			 +'<p style="font-size:25px;" id="h_two">Selected Movies</p>'+
			 '<ul style="width: 216%; padding-top:5%;">'+'<li style="font-size:25px; width=100% ;margin-left: -41%;" id="sl" ng-repeat = "y in selectedlist"> {{y.name}}- {{y.cast}} <button class="delete-icon" ng-click="removeItem(y)">x</button> </li>'+ '</ul></div>',
	link : function(scope,elem,attrs){
var flagValid = true;
		scope.focusindex = 0;
		scope.inputChanged = function() {
		console.log('input changed');

		if(flagValid && scope.searchText!= '')
		{
			scope.getSearchData({search: scope.searchText});
		}
		else if(scope.searchText== '')
		scope.data = [];
		flagValid = true;
		};

		scope.additem = function(obj)
			{ 
             scope.focusindex = 0;
			scope.selectedlist.push({ name:obj.name, cast: obj.cast});
			scope.searchText = '';
			scope.data = [];
			} 
		scope.removeItem = function(obj){
			var temp = scope.selectedlist.indexOf(obj);
			scope.selectedlist.splice(temp,1);
		}
		scope.key = function(event){
		//this is up arrow

    if (event.keyCode == 38 && scope.focusindex!= 0)
	{ 
       scope.focusindex --;

    }
	
	// this is down arrow (key arrow for 40)
    else if (event.keyCode == 40 && scope.focusindex!= scope.data.length)   
	{
		scope.focusindex ++;

	}
	  else if (event.keyCode == 40 && scope.focusindex== scope.data.length)
	{
		scope.focusindex =1;

	}
	  else if (event.keyCode == 38 && scope.focusindex== 0)
	{
		scope.focusindex =scope.data.length;

	}

	}
	}
}
});