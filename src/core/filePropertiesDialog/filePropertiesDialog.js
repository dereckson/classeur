angular.module('classeur.core.filePropertiesDialog', [])
	.factory('clFilePropertiesDialog', function($mdDialog, clToast) {
		return function(properties) {
			properties = properties || {};
			properties = Object.keys(properties).sort().map(function(key) {
				return {
					key: key,
					value: properties[key]
				};
			});
			return $mdDialog.show({
				templateUrl: 'core/filePropertiesDialog/filePropertiesDialog.html',
				controller: function(scope) {
					scope.properties = properties;
					scope.deleteRow = function(propertyToDelete) {
						scope.properties = scope.properties.filter(function(property) {
							return property !== propertyToDelete;
						});
					};
					scope.addRow = function() {
						scope.properties.push({});
					};
					scope.ok = function() {
						var properties = {};
						if (scope.properties.some(function(property) {
								if (!property.key && !property.value) {
									return;
								}
								if (!property.key) {
									clToast('Property can\'t be empty.');
									return true;
								}
								if (!property.value) {
									clToast('Property can\'t be empty.');
									return true;
								}
								if (properties.hasOwnProperty(property.key)) {
									clToast('Duplicate property: ' + property.key + '.');
									return true;
								}
								properties[property.key] = property.value;
							})) {
							return;
						}
						$mdDialog.hide(properties);
					};
					scope.cancel = function() {
						$mdDialog.cancel();
					};
				},
			});
		};
	});