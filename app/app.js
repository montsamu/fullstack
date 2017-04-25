
angular.module('app', ['ngRoute', 'ngResource'])

  .factory('Contacts', ['$resource', function($resource) {
	  return $resource('/contacts/:id', null, {
		  'update': { method:'PUT' }
	  });
  }])

    .controller('ContactsController', ['$scope', 'Contacts', function ($scope, Contacts) {
	    $scope.contacts = Contacts.query();
	    $scope.sortKey = 'firstName';
	    $scope.reverse = false;
	    $scope.sort = function(keyname) {
		    	$scope.sortKey = keyname;
			$scope.reverse = !$scope.reverse;
	    }
	    $scope.save = function() {
		    if(!$scope.newContact || $scope.newContact.length < 1) return;
		    var contact = new Contacts({ firstName: $scope.newContact });
		    contact.$save( function() {
			    $scope.contacts.push(contact);
			    $scope.newContact = '';
		    });
	    }

    }])

    .controller('ContactDetailsController', ['$scope', '$routeParams', 'Contacts', '$location', function ($scope, $routeParams, Contacts, $location) {
	    $scope.contact = Contacts.get({id: $routeParams.id });
	    $scope.update = function() {
		    var newContactData = $scope.contact;
		    $scope.updatedContact = Contacts.update({id: $scope.contact._id}, newContactData);
	    }
	    $scope.remove = function() {
		    Contacts.remove({id: $scope.contact._id}, function() {
			    $location.url('/');
		    });
	    }
    }])

    .config(['$routeProvider', function ($routeProvider) {
	    $routeProvider.when('/', {
		    templateUrl: '/contacts.html',
		    controller: 'ContactsController'
	    })
	    .when('/:id', {
		    templateUrl: '/contactDetails.html',
		    controller: 'ContactDetailsController'
	    });

    }]);

