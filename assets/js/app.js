

var app = angular.module('testApp', ['ngGridView']);

app.controller('textController', ['$scope', function ($scope) {

    $scope.form = {};
    $scope.form.directory = [
        { name: 'Samuel', phone: '809-566-5985' },
        { name: 'Jeancarlos', phone: '809-566-5985' },
        { name: 'mancebo', phone: '1849-566-5985' },
        { name: '', phone: '1337-566-5985' },
        { name: '', phone: '1809-566-5985' },
        { name: '', phone: '1475-588-5988' },
        { name: 'Samuel', phone: '009-566-5985' },
         { name: 'Samuel', phone: '809-566-5985' },
        { name: 'Jeancarlos', phone: '809-566-5985' },
        { name: 'mancebo', phone: '1849-566-5985' },
        { name: '', phone: '1337-566-5985' },
        { name: '', phone: '1809-566-5985' },
        { name: '', phone: '1475-588-5988' },
        { name: '', phone: '1475-588-5988' },
        { name: 'Samuel', phone: '009-566-5985' }
    ]

    $scope.pruebame = function (name) {
        console.log($scope);
    }

    $scope.addValue = function () {
        //$scope.form.directory.push({name: 'prueba2', phone: '12345679'})
        console.log($scope);
    }

    $scope.addPage = function () {
        $scope.gvCurrentPage++;
    }

    $scope.removePage = function () {
        $scope.gvCurrentPage--;
    }


    $scope.procesar = function (name) {
        return 'procesado el nombre de ' + name;
    }
}]);