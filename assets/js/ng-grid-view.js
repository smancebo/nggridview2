

var app = angular.module('ngGridView', []);


app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});

app.directive('gridSearch', function () {
    return {
        restrict: 'E',
        template: "<div class='form-group' ng-style='{\"width\": filterWidth}' style='transition:all .5s; float:right' >" +
                    "<div class='input-group'>" +
                        "<div class='input-group-addon'>" +
                            "<a style='cursor:pointer' ng-click='toggleSearch()'><i class='glyphicon glyphicon-search'></i></a>" +
                        "</div>" +
                        "<input  type='text' placeholder='Filter' ng-focus='filterWidth = \"25%\"' ng-blur='filterWidth = \"15%\"' class='form-control' ng-model='$parent.gvTextFilter' />" +
                    "</div>" +
                "</div>",
        controller: ['$scope', function ($scope) {
            $scope.filterWidth = '15%';
            $scope.gridSearch = {};
            $scope.gridSearch.gvTextFilter
            $scope.toggleSearch = function () {
                if ($scope.filterWidth == '15%') {
                    $scope.filterWidth = '25%'
                }
                else {
                    $scope.filterWidth = '15%';
                }
            }

            $scope.openSearch = function () {
                $scope.filterWidth = '25%'
            }
            $scope.closeSearch = function () {
                
            }
        }]
    }
})

app.directive('gridPaginator', [function () {
    return {
        restrict: 'E',
        scope:{
            pageSize:'@',
            currentPage: '=',
            source: '=',
            filter:'=',
            onPageSelected:'&?'
        },
        controller: ['$scope','$filter', function ($scope, $filter) {

            


            $scope.$watch('filter', function () {
                
                $scope.createPages();
                
            });

            $scope.$watch('pageSize', function () {
                $scope.createPages();
            });

           
            $scope.createPages = function () {
                $scope.filteredSource = $filter('filter')($scope.source, $scope.filter)

                $scope.totalPage = ($scope.filteredSource.length / parseInt($scope.pageSize, 10));
                if ($scope.totalPage > Math.round($scope.totalPage)) {
                    $scope.totalPage = Math.round($scope.totalPage) + 1;
                } else {
                    $scope.totalPage = Math.round($scope.totalPage);
                }

                $scope.pageCount = [];
                for (var i = 0; i <= $scope.totalPage - 1; i++) {
                    $scope.pageCount.push(i);
                }

                $scope.firstPage();
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
        template: "<nav ng-if='pageCount.length > 1'>" +
                        "<ul class='pagination pagination-sm' style='margin:0'>" +
                            "<li><a style='color:#23527C; cursor:pointer' ng-click='firstPage()'><span>&laquo;</span></a></li>" +
                            "<li><a style='color:#23527C; cursor:pointer' ng-click='prevPage()'><i class='glyphicon glyphicon-chevron-left'></i></a></li>" +
                            "<li ng-class='{\"active\" : page == currentPage.pageNumber}' ng-repeat='page in pageCount'><a style='cursor:pointer' ng-click='selectCurrentPage(page)'>{{page+1}}</a></li>" +
                            "<li><a style='color:#23527C; cursor:pointer' ng-click='nextPage()'><i class='glyphicon glyphicon-chevron-right'></i></a></li>" +
                            "<li><a style='color:#23527C; cursor:pointer' ng-click='lastPage()'><span>&raquo;</span></a></li>" +
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
        template: "<div ng-switch on='column.type' ng-if='column.visible'>" +
                        "<div ng-switch-when='template' compile='{{column.template}}'></div>" +
                        "<div ng-switch-when='bound'>" +
                            "{{  column.text || row[column.dataField] || column.nullText }}" +
                        "</div>" +
                        "<div ng-switch-when='counter'>" +
                            "{{ $parent.$parent.$index + 1 }}" +
                        "</div>" +
                  "</div>",
        replace: false,
        
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
                if ($scope.$parent.row[$scope.column.dataField] == undefined || $scope.$parent.row[$scope.column.dataField] == null || $scope.$parent.row[$scope.column.dataField] == '')
                {

                    switch ($scope.column.columnType) {
                        case "number":
                            $scope.$parent.row[$scope.column.dataField] = 0;
                            break;
                        default:
                            $scope.$parent.row[$scope.column.dataField] = $scope.column.nullText;
                            break;
                    }
                    
                }
            }
        }
    }

}])

app.directive('gridView', ['$compile', '$parse', '$interpolate', function ($compile, $parse, $interpolate) {

    return {

        restrict: 'E',
        controller: ['$scope', function ($scope) {
            
           
            
            $scope.sortTable = function (sortExpression) {
                //$scope.reverse = $scope.reverse || true;
                $scope.currentColumn = sortExpression;
                $scope.reverse = !$scope.reverse;

                switch (sortExpression.columnType) {
                    case "number":
                        $scope.sorter = function (value) {
                            
                            return parseFloat(value[$scope.currentColumn.sorter] || 0);
                        }
                        break;

                    default:
                       
                        $scope.sorter = sortExpression.sorter;
                       
                        break;

                }
            }


            $scope.sameSorter = function (sortExpression) {
                if ($scope.sorter == sortExpression || $scope.currentColumn == undefined ? true : $scope.currentColumn.sorter == sortExpression) {
                    return true
                }
                else {
                    return false;
                }
            }
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
                "<grid-search ng-if='" + config.allowSearch + "'></grid-search>" +
                "<table class='table table-striped'>" +
                    "<thead>" +
                        "<tr>" +
                            "<th class='gv-header' ng-repeat='column in columns' ng-if='column.visible' ng-click='column.sorteable == true && sortTable(column)' ng-style='column.sorteable == true && {\"cursor\" : \"pointer\"}'>" +
                                "<div ng-if='column.sorteable' ng-if='" + config.allowSorting + "'>" +
                                    "{{column.headerText}}" +
                                    "<div style='float:right;'>" +
                                        "<i ng-hide='sameSorter(column.sorter)  && reverse == true' ng-if='column.sorteable' style='display:block; font-size:10px' class='glyphicon glyphicon-triangle-top'></i>" +
                                        "<i ng-hide='sameSorter(column.sorter)  && reverse == false' ng-if='column.sorteable' style='display:block; font-size:10px' class='glyphicon glyphicon-triangle-bottom'></i>" +
                                    "</div>" +
                                "</div>" +
                                "<div ng-if='!" + config.allowSorting + "'>" +
                                    "{{column.headerText}}" +
                                "</div>" +
                            "</th>" +
                        "</tr>" +
                    "</thead>" +
                    "<tbody>" +
                        "<tr ng-repeat='row in " + config.gvdataSource + " | filter: gvTextFilter | orderBy:sorter:reverse | offset: gvCurrentPage.pageNumber*gvPageSize | limitTo: gvPageSize'>" +
                            "<td ng-repeat='column in columns' ng-if='column.visible'>" +
                                "<grid-column column='column' row='row'></grid-column>" +
                            "</td>" +
                        "</tr>" +
                    "</tbody>" +
                    "<tfoot>" +
                        "<tr ng-if='(" + config.gvdataSource + " | filter: gvTextFilter).length == 0'>" +
                            "<td colspan={{columns.length}}>" +
                                "<p style='text-align:center'>" + config.emptyText + "</p>" +
                            "</td>" +
                        "</tr>" +
                        "<tr>" +
                            "<td colspan='{{columns.length}}' style='padding-left:0'>" +
                                "<grid-paginator ng-hide='" + config.gvdataSource + ".length < gvPageSize' current-page='gvCurrentPage' filter='gvTextFilter' source='" + config.gvdataSource + "' page-size='" + config.pageSize + "'  ng-if='" + config.allowPagging + "'></grid-paginator>" +
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
                column.columnType = $(this).attr('column-type') || 'string';
                column.visible = $(this).attr('visible') || 'true';

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

                if (column.visible === 'false') {
                    column.visible = false;
                }
                else if (column.visible === 'true') {
                    column.visible = true;
                }
                else
                {
                    //throw 'Visible value not valid, should be true or false and has ' + column.visible;
                }

                /*attrs.$observe('visible', function (value) {
                    debugger
                    column.visible = value;
                })*/

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
                    $scope.gvPageSize = config.pageSize || 10;
                }

                attrs.$observe('pageSize', function (value) {
                    $scope.gvPageSize = value;
                })

                $scope.columns = data.columns;
                
                $scope.gvCurrentPage = {};
                $scope.gvCurrentPage.pageNumber = 0;
                
                element.html('');
                element.append($compile(template)($scope));
            }

        }

    };

   

   

}]);