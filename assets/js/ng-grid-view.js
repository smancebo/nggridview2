

var app = angular.module('ngGridView', []);


app.directive('compile', ['$compile', '$parse', '$interpolate', function ($compile, $parse, $interpolate) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var html = angular.copy(attrs.compile);
            element.removeAttr('compile');
            element.html($interpolate(html)(scope.$parent.$parent.row));
            $compile(element.contents())(scope);
        }
    }

}]);


app.directive('gridColumn', ['$compile', '$interpolate', function ($compile, $interpolate) {

    return {
        restrict: 'E',
        template: "<div ng-switch on='column.type'>" +
                        "<div ng-switch-when='template' compile='{{column.template}}'></div>" +
                        "<div ng-switch-when='bound'>" +
                            "{{ row[column.dataField] || column.text || column.nullText }}" +
                        "</div>" +
                        "<div ng-switch-when='counter'>" +
                            "{{ $parent.$parent.$index + 1 }}" +
                        "</div>" +
                  "</div>",
        replace: true,
        
        link: function ($scope, element, attr) {
            $scope.column = angular.copy($scope.column);
            $scope.$parent.row.$even = $scope.$parent.$even;
            $scope.$parent.row.$first = $scope.$parent.$first;
            $scope.$parent.row.$id = $scope.$parent.$id;
            $scope.$parent.row.$index = $scope.$parent.$index;
            $scope.$parent.row.$last = $scope.$parent.$last;
            $scope.$parent.row.$middle = $scope.$parent.$middle;
            $scope.$parent.row.$odd = $scope.$parent.$odd;

            if ($scope.column.type == 'bound') {
                $scope.column.text = $interpolate($scope.column.text)($scope.$parent.row);
                $scope.column.nullText = $interpolate($scope.column.nullText)($scope.$parent.row);
            }
        }
    }

}])

app.directive('gridView', ['$compile', '$parse', function ($compile, $parse) {

    return {

        restrict: 'E',
        compile: function (element, attrs) {

            var gv = "";
            var data = {};
            data.columns = [];

            var config = {
                gvdataSource: attrs.gvdataSource || '',
                allowSorting: attrs.allowSorting || false,
                allowPagging: attrs.allowPagging || false,
                allowSearch: attrs.allowSearch || false,
                pageSize: attrs.pageSize || 10,
                emptyText: attrs.emptyText || ''
            }
            

            /*
            allow-sorting="" allow-pagging="" allow-search="" page-size="10" gvdata-source="form.directory" empty-text=""
            */

            var template =

            "<div class='table-responsive'>" +
                "<table class='table table-striped'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th class='gv-header' ng-repeat='column in columns'>" + 
                                "{{column.headerText}}<i ng-if='column.sorteable' style='float:right; font-size:10px' class='glyphicon glyphicon-triangle-bottom'></i>" +
                            "</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        "<tr ng-repeat='row in " + config.gvdataSource + "'>" +
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
                column.text = $(this).attr('text') || '';
                column.nullText = $(this).attr('null-text') || '';
                column.sorteable = $(this).attr('sorteable');
                column.counter = $(this).attr('counter');

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