

var app = angular.module('ngGridView', []);


app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.directive('gridPaginator', [function () {
    return {
        restrict: 'E',
        scope:{
            pageSize:'@',
            currentPage: '=',
            source: '=',
            onPageSelected:'&?'
        },
        controller: ['$scope', function ($scope) {

            
            $scope.totalPage = ($scope.source.length / parseInt($scope.pageSize,10));
            if ($scope.totalPage > Math.round($scope.totalPage)) {
                $scope.totalPage = Math.round($scope.totalPage) + 1;
            } else
            {
                $scope.totalPage = Math.round($scope.totalPage);
            }

            $scope.pageCount = [];
            for (var i = 0; i <= $scope.totalPage - 1; i++) {
                $scope.pageCount.push(i);
            }

            $scope.firstPage = function () {
                $scope.selectCurrentPage(0);
            }

            $scope.lastPage = function () {
                $scope.selectCurrentPage($scope.pageCount.length - 1);
            }

            $scope.nextPage = function () {
                var next = $scope.currentPage.pageNumber + 1;
                if (next >= $scope.pageCount.length) {
                    next = $scope.pageCount.length - 1;
                }
                $scope.selectCurrentPage(next);
            };

            $scope.prevPage = function () {
                var back = $scope.currentPage.pageNumber - 1;
                if (back <= 0) {
                    back = 0;
                }
                $scope.selectCurrentPage(back);
            };

            $scope.selectCurrentPage = function (page) {
                
                $scope.currentPage.pageNumber = page;
                if ($scope.onPageSelected) {
                    $scope.onPageSelected(page);
                }
            }
        }],
        template: "<nav>" +
                        "<ul class='pagination'>" +
                            "<li><a href='#' ng-click='firstPage()'><span>&laquo;</span></a></li>" +
                            "<li><a href='#' ng-click='prevPage()'><i class='glyphicon glyphicon-chevron-left'></i></a></li>" +
                            "<li ng-class='{\"active\" : page == currentPage.pageNumber}' ng-repeat='page in pageCount'><a href='#' ng-click='selectCurrentPage(page)'>{{page+1}}</a></li>" +
                            "<li><a href='#' ng-click='nextPage()'><i class='glyphicon glyphicon-chevron-right'></i></a></li>" +
                            "<li><a href='#' ng-click='lastPage()'><span>&raquo;</span></a></li>" +
                        "</ul>" + 
                  "</nav>"
                    
    }
}]);

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
                            "{{  column.text || row[column.dataField] || column.nullText }}" +
                        "</div>" +
                        "<div ng-switch-when='counter'>" +
                            "{{ $parent.$parent.$index + 1 }}" +
                        "</div>" +
                  "</div>",
        replace: true,
        
        link: function ($scope, element, attr) {
            $scope.column.sorter = $scope.column.dataField;
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
                $scope.$parent.row[$scope.column.dataField] = $scope.$parent.row[$scope.column.dataField] == '' ? $scope.column.nullText : $scope.$parent.row[$scope.column.dataField];
            }
        }
    }

}])

app.directive('gridView', ['$compile', '$parse', '$interpolate', function ($compile, $parse, $interpolate) {

    return {

        restrict: 'E',
        controller: ['$scope', function ($scope) {
            
            $scope.sortTable = function (sortExpression) {

                if (sortExpression == $scope.sorter) {
                    $scope.sorter = '-' + sortExpression;
                }
                else
                {
                    $scope.sorter = sortExpression;
                }
            }

            $scope.isDesc = function (sortExpression) {
                
                if ($scope.sorter == undefined)
                {
                    return false;
                }
                if ($scope.sorter.indexOf('-') == -1) {
                    return true;
                }
                else
                {
                    return false;
                }
            };

        }],
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
                                "<div ng-if='" + config.allowSorting + "' ng-click='sortTable(column.sorter)'>" +
                                    "{{column.headerText}}" +
                                    "<div style='float:right;'>" +
                                        "<i ng-hide='' ng-if='column.sorteable' style='display:block; font-size:10px' class='glyphicon glyphicon-triangle-top'></i>" +
                                        "<i ng-hide='' ng-if='column.sorteable' style='display:block; font-size:10px' class='glyphicon glyphicon-triangle-bottom'></i>" +
                                    "</div>" +
                                "</div>" +
                                "<div ng-if='!" + config.allowSorting + "'>" +
                                    "{{column.headerText}}" +
                                "</div>" +
                            "</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        "<tr ng-repeat='row in " + config.gvdataSource + " | orderBy:sorter | offset: gvCurrentPage.pageNumber*gvPageSize | limitTo: gvPageSize'>" +
                            "<td ng-repeat='column in columns'>" +
                                "<grid-column column='column' row='row'></grid-column>" +
                            "</td>" +
                        "</tr>" +
                    "</tbody>" +
                    "<tfoot>" +
                        "<tr>" +
                            "<td colspan='{{columns.length}}'>" +
                                "<grid-paginator current-page='gvCurrentPage' source='" + config.gvdataSource + "' page-size='" + config.pageSize + "'  ng-if='" + config.allowPagging + "'></grid-paginator>" +
                            "</td>" +
                        "</tr>" +
                    "</tfoot>" +
                "</table>" +
                
            "</div>";

            element.find('columns').children().each(function () {
                
                var column = {};
                column.headerText = $(this).attr('header-text') || '';
                column.dataField = $(this).attr('data-field') || '';
                column.text = $(this).attr('text') || '';
                column.nullText = $(this).attr('null-text') || '';
                column.sorteable = $(this).attr('sorteable') == undefined ? 'true' : $(this).attr('sorteable');
                column.counter = $(this).attr('counter') || false;
                var columnTag = $(this)[0].tagName.toLowerCase();

                
                if ((column.dataField == '' || column.dataField == undefined) && column.counter == false && columnTag != 'templatecolumn') {
                    throw "Columns require the attribute 'data-field'"
                }

                if (column.sorteable === 'false') {
                    column.sorteable = false;
                } else if (column.sorteable === 'true') {
                    column.sorteable = true;
                }
                else {
                    throw 'Sorteable value not valid, should be true or false and has ' + column.sorteable;
                }


                switch (columnTag) {
                    case 'column':
                        column.type = 'bound'
                        break;

                    case 'templatecolumn':
                        column.type = 'template'
                        column.template = $(this).html();
                        column.sorteable = false;
                        break;
                }

                if (column.counter === 'true') {
                    column.type = 'counter';
                    column.sorteable = false;
                }

                data.columns.push(column);
            });


            return function ($scope, element, attrs) {
                if (config.allowPagging === 'false') {
                    $scope.gvPageSize = null;
                }
                else
                {
                    $scope.gvPageSize = config.pageSize;
                }

                $scope.columns = data.columns;
                
                $scope.gvCurrentPage = {};
                $scope.gvCurrentPage.pageNumber = 0;

                element.replaceWith($compile(template)($scope));
            }

        }

    };

   

   

}]);