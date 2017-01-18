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

craftApp.factory('currentUser', function(){
	var user = {};

	user.value = {};

	return user;
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

craftApp.controller('loginCtrl', ['$scope', '$http', '$state', 'currentUser', function($scope, $http, $state, currentUser) {
	$scope.user = {};
	$scope.userLogin = function() {
		return $http.post('/login', $scope.user).then(
			function success(data){
				currentUser.value = data.data;
				console.log('Login, currentUser.value is: ', currentUser.value);
				$state.transitionTo('allChallenges');
			},
			function error(err) {
				console.log('err: ',err);
				$scope.error = err;
			});
	}
}]);

craftApp.controller();

craftApp.controller('newEntryCtrl', ['$scope', '$http', 'currentUser', function($scope, $http, currentUser) {

	$scope.saveEntry = function() {
		console.log('SAVED ENTRY');
		console.log('currentUser.value is: ', currentUser.value);
		console.log('currentUser.value._id is: ', currentUser.value._id);
		$scope.entryObj.currentUser = currentUser.value._id;
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
		var randomInd = Math.floor(Math.random() * (data.data.length));
		$scope.challenge = data.data[randomInd];
	},
	function(err) {
		console.log(err);
	});

	$scope.revealAnswer = function() {
		$scope.answer = $scope.challenge.mySolution;
	}
}]);
