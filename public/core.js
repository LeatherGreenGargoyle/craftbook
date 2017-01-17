var craftApp = angular.module('craftApp',['ui.router']);

craftApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/newEntry');

	$stateProvider
		.state('newEntry', {
			url:'/newEntry',
			templateUrl: './partials/partial-newEntry.html',
			controller: 'newEntryCtrl'
		})
		.state('allChallenges', {
			url:'/allChallenges',
			templateUrl:'./partials/partial-allChallenges.html',
			controller: 'allChallengesCtrl'
		})
		.state('randomChallenge', {
			url: '/randomChallenge',
			templateUrl:'./partials/partial-randomChallenge.html',
			controller: 'randomChallengeCtrl'
		});
});

craftApp.controller('newEntryCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.saveEntry = function() {
		$http.post('/entries', $scope.entryObj)
			.then(
				function(data) {
					console.log(data);
				},
				function(err) {
					console.log(err);
				});
	}
}]);

craftApp.controller('allChallengesCtrl', ['$scope', '$http', function($scope, $http) {
	
	$http.get('/entries').then(
	function(data) {
		$scope.data = data.data;
		$scope.currentEntry = $scope.data[0];
	},
	function(err) {
		console.log(err);
	});

	$scope.showEntry = function(entry){
		$scope.currentEntry = entry;
	}
	
}]);

craftApp.controller('randomChallengeCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.challenge;
	$http.get('/entries').then(
	function(data) {
		var randomInd = Math.floor(Math.random() * (data.data.length - 1));
		$scope.challenge = data.data[randomInd];
	},
	function(err) {
		console.log(err);
	});

}]);
