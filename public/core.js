var craftApp = angular.module('craftApp',['ui.router']);

craftApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/newEntry');

	$stateProvider
		.state('newEntry', {
			url:'/newEntry',
			templateUrl: './partials/partial-newEntry.html',
			controller: 'newEntryCtrl'
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
