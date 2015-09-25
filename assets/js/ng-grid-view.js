

var app = angular.module('ngGridView', []);


app.directive('compile', ['$compile', function ($compile) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            debugger
            scope.$watch(
                function (scope) {
                    //return scope.$eval(attrs.compile);
                    return attrs.compile;
                },

                function (value) {
                    debugger
                    element.html(value);
                    $compile(element.contents())(scope);
                }


           )

        }
    }

}]);


app.directive('gridColumn', ['$compile', '$parse', function ($compile, $parse) {

    return {
        restrict: 'E',
        scope: {
            row: '=',
            column: '='
        },
        template: "<div ng-switch on='column.type'>" +
                        "<div ng-switch-when='template' compile='{{column.template}}'></div>" +
                        "<div ng-switch-when='bound'>" +
                            "{{ row[column.dataField] || column.text || column.nullText }}" +
                        "</div>" +
                        "<div ng-switch-when='counter'>" +
                            "{{ $parent.$index + 1 }}" +
                        "</div>" +
                  "</div>",
        replace: true,
       //bindToController:true,
        
        link: function ($scope, element, attr) {
            debugger
            $scope.column = angular.copy($scope.column);
            $scope.column.text = $parse($scope.column.text)($scope.row);
            $scope.column.nullText = $parse($scope.column.nullText)($scope.row);
            $scope.column.template = $parse($scope.column.template)($scope.row);
            //$scope.column.template = ($scope.column.template);


            /*var compiled = element.replaceWith($compile(template)($scope));
            if ($scope.column.template) {
                element.find('.gvItemTemplate').replaceWith($compile($scope.column.template)($scope));
            }*/
        }
        

    }

}])

app.directive('gridView', ['$compile',function ($compile) {

    return {

        restrict: 'E',
       /* scope: {
            gvdataSource: '=',
            allowSorting: '@',
            allowPagging: '@',
            allowSearch: '@',
            pageSize: '@',
            emptyText: '@'
        },*/
       /* template:
                    "<div class='table-responsive'>" +
                        "<table class='table table-striped'>" +
                            "<thead>" +
                                "<tr>" +
                                    "<th ng-repeat='column in columns'>{{column.headerText}}</th>" +
                                "</tr>" +
                            "</thead>" +
                            "<tbody>" +
                                "<tr ng-repeat='row in dataSource'>" +
                                    "<td ng-repeat='column in columns'>" +
                                        "<div ng-switch on='column.type'>" +
                                            "<div ng-switch-when='template'>" +
                                                "{{column.template}}" +
                                            "</div>" +
                                            "<div ng-switch-when='bound'>" +
                                                "{{ row[column.dataField] || column.text || column.nullText }}"+
                                            "</div>" +
                                            "<div ng-switch-when='counter'>" +
                                                "{{ $parent.$index + 1 }}" +
                                            "</div>" +
                                        "</div>" +
                                    "</td>" +
                                "</tr>" +
                            "</tbody>"+
                        "</table>" + 
                    "</div>",*/
        compile: function (element, attrs) {

            var gv = "";
            var data = {};
            data.columns = [];

            var gvdataSource = attrs.gvdataSource;

            var template =

            "<div class='table-responsive'>" +
                "<table class='table table-striped'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th ng-repeat='column in columns'>{{column.headerText}}</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        "<tr ng-repeat='row in " + gvdataSource + "'>" +
                            "<td ng-repeat='column in columns'>" +
                                "<grid-column column='column' row='row'></grid-column>"+
                            "</td>" +
                        "</tr>" +
                    "</tbody>" +
                "</table>" +
            "</div>";

            element.find('columns').children().each(function () {
                var column = {};
                column.headerText = $(this).attr('header-text');
                column.dataField = $(this).attr('data-field');
                column.text = $(this).attr('text');
                column.nullText = $(this).attr('null-text');
                column.sorteable = $(this).attr('sorteable');
                column.counter = $(this).attr('counter');
                column.value = column.dataField || column.text || column.nullText;

                var columnTag = $(this)[0].tagName.toLowerCase();

                switch (columnTag) {
                    case 'column':
                        column.type = 'bound'
                        break;

                    case 'templatecolumn':
                        column.type = 'template'
                        column.template = $(this).html();
                        break;
                }

                if (column.counter === 'true') {
                    column.type = 'counter'
                }

                data.columns.push(column);
            });


            return function ($scope, element, attrs) {
                $scope.columns = data.columns;
                
                element.replaceWith($compile(template)($scope));
            }

        }

    };

   

   

}]);