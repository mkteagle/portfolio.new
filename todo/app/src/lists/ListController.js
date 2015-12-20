(function () {

    angular
        .module('lists')
        .controller('ListController', [
            'listService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            ListController
        ])
        .filter('ifArchived', function(){
            var out = [];
            return function(input){
                angular.forEach(input, function(archiveme){
                    if(archiveme.archived === 'false'){
                        out.push(archiveme)
                    }
                });
                return out;
            }
        })
        .directive ( 'editInPlace', function() {
        return {
            restrict: 'E',
            scope: { value: '=' },
            template: '<span class="todoName" ng-click="edit()" ng-bind="value" ng-keypress="$event.which === 13 && finished()"></span><input class="todoField" type="text" ng-model="value"></input>',
            link: function ( $scope, element, attrs ) {
                // Let's get a reference to the input element, as we'll want to reference it.
                var inputElement = angular.element( element.children()[1] );

                // This directive should have a set class so we can style it.
                element.addClass( 'edit-in-place' );

                // Initially, we're not editing.
                $scope.editing = false;
                $scope.finished = function () {
                    $scope.editing = false;
                    element.removeClass('active');
                };
                // ng-dblclick handler to activate edit-in-place
                $scope.edit = function () {
                    $scope.editing = true;

                    // We control display through a class on the directive itself. See the CSS.
                    element.addClass( 'active' );

                    // And we must focus the element.
                    // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
                    // we have to reference the first element in the array.
                    inputElement.focus();
                };

                // When we leave the input, we're done editing.
                inputElement.on("blur",function  () {
                    $scope.editing = false;
                    element.removeClass( 'active' );
                });

            }
        };
    });

    function ListController(listservice, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        var cIndex = 1;
        var iIndex = 0;
        var svgindex = 2;
        var currentShow = 0;
        var svgArr = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
        self.lists = listservice.lists;

        self.selected = null;
        self.lists = [];
        self.selectList = selectList;

        // Load all registered lists

        listservice
            .loadAllLists()
            .then(function (lists) {
                self.lists = [].concat(lists);
                self.selected = lists[0];
            });

        // *********************************
        // Internal methods
        // *********************************
        /**
         * Select the current avatars
         * @param menuId
         */
        function selectList(list) {
            self.selected = angular.isNumber(list) ? $scope.lists[list] : list;
            $(".containers").removeClass('hide');
        }

        self.addList = function () {
            self.lists.push({index: cIndex, name: self.todoList, avatar: svgArr[svgindex], items: [], archived: false
             });
            self.todoList = '';
            if (svgindex == (svgArr.length-1)) {
                svgindex = 0;
            }
            else {svgindex++;}
            cIndex++;
        };
        self.addItem = function (currentShow) {
            self.lists[currentShow].items.push({item: iIndex, text : self.todo , done : false });
            self.todo = '';
            iIndex++;
        };
        self.deleteItem = function (item) {
            self.lists[currentShow].items.splice(self.lists[currentShow].items.indexOf(item),1);
        };
        self.changeToDo = function (i) {
            currentShow = i;
        };
        self.archiveList = function() {
            var oldTodos = self.lists[currentShow].items;
            self.lists[currentShow].items = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) self.lists[currentShow].items.push(todo);
            });
        };
        self.deleteList = function () {

        };
        self.archiveAll = function () {
            self.lists[currentShow].archived = true;
            $(".containers").addClass('hide');
        };
    }

})();
