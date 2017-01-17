var craftApp = angular.module('craftApp',['ui.router', 'ngMaterial']);

craftApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/login');

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
		})
		.state('signup',{
			url: '/signup',
			templateUrl: './partials/partial-signup.html',
			controller: 'signupCtrl'
		})
		.state('login', {
			url: '/login',
			templateUrl: './partials/partial-login.html',
			controller: 'loginCtrl'
		});
});

craftApp.controller('signupCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.newUser = {};
	$scope.userSignUp = function() {
		$http.post('/signup', $scope.newUser).then(
			function success(data){
				console.log(data);
				$state.go('login');
			},
			function error(err) {
				console.log(err);
			});
	}
}]);

craftApp.controller('loginCtrl', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.user = {};
	$scope.userLogin = function() {
		return $http.post('/login', $scope.user).then(
			function success(data){
				$state.transitionTo('allChallenges');
			},
			function error(err) {
				console.log('err: ',err);
				$scope.error = err;
			});
	}
}]);

craftApp.controller();

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

	$scope.newEntryTab = function() {
		window.open('/#/newEntry', '_blank');
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
		console.log('data.data is: ', data.data);
		var randomInd = Math.floor(Math.random() * (data.data.length));
		console.log('randomInd is: ', randomInd);
		$scope.challenge = data.data[randomInd];
	},
	function(err) {
		console.log(err);
	});

	$scope.revealAnswer = function() {
		$scope.answer = $scope.challenge.mySolution;
	}
}]);
