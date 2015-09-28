

var app = angular.module('testApp', ['ngGridView']);

app.controller('textController', ['$scope', function ($scope) {

    $scope.form = {};
    $scope.form.directory = [
        { name: 'Samuel', phone: '809-566-5985' },
        { name: 'Jeancarlos', phone: '809-566-5985' },
        { name: 'mancebo', phone: '809-566-5985' },
        { name: '', phone: '809-566-5985' },
        { name: 'Samuel', phone: '809-566-5985' }
    ]

    $scope.pruebame = function (name) {
        debugger
        alert('esta es mi prueba hehehe ' + name);
    }

    $scope.procesar = function (name) {
        return 'procesado el nombre de ' + name;
    }
}]);