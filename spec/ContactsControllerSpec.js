'use strict';

describe('the contact application', function() {
	beforeEach(module('app'));

	describe('contacts controller', function() {
		var $scope, $controller;

		beforeEach( inject(function(_$rootScope_, _$controller_) {
			$scope = _$rootScope_.$new();
			$controller = _$controller_('ContactsController', {$scope: $scope});
		}));

		it('sets the sortKey', function() {
			$scope.sort('lastName');
			expect($scope.sortKey).toEqual('lastName');
		});
		it('sets the reverse flag', function() {
			$scope.sort('firstName');
			expect($scope.reverse).toEqual(true);
		});
})});

