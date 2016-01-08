(function () {

    angular
        .module('lists')
        .controller('ListController', [
            'ListService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            ListController
        ])
        .filter('ifArchived', function () {
            var out = [];
            return function (input) {
                angular.forEach(input, function (archiveme) {
                    if (archiveme.archived === 'false') {
                        out.push(archiveme)
                    }
                });
                return out;
            }
        })
        .directive('editInPlace', function () {
            return {
                restrict: 'E',
                scope: {value: '='},
                template: '<span class="todoName" ng-click="edit()" ng-bind="value" ng-keypress="$event.which === 13 && finished()"></span><input class="todoField" type="text" ng-model="value"></input>',
                link: function ($scope, element, attrs) {
                    // Let's get a reference to the input element, as we'll want to reference it.
                    var inputElement = angular.element(element.children()[1]);

                    // This directive should have a set class so we can style it.
                    element.addClass('edit-in-place');

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
                        element.addClass('active');

                        // And we must focus the element.
                        // `angular.element()` provides a chainable array, like jQuery so to access a native DOM function,
                        // we have to reference the first element in the array.
                        inputElement.focus();
                    };

                    // When we leave the input, we're done editing.
                    inputElement.on("blur", function () {
                        $scope.editing = false;
                        element.removeClass('active');
                    });

                }
            };
        });
    //ListController.$inject = ['ListService'];

    function ListController(ListService, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        var cIndex = 1;
        var svgindex = 2;
        var currentShow = 0;
        var svgArr = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
        self.lists = ListService.lists;
        self.addList = addList;
        self.toggleList = toggleList;

        self.selected = null;
        self.selectList = selectList;

        // Load all registered lists
        self.refreshList = refreshList;

        ListService
            .loadAllLists()
            .then(function (lists) {
                self.lists = [].concat(lists);
                self.selected = lists[0];
            });
        function refreshList () {
            ListService
                .loadAllLists()
                .then(function (lists) {
                    self.lists = [].concat(lists);
                    self.selected = lists[0];
                });
        }
        function toggleList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);
            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }


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
        function addList() {
            ListService.addList(self.todoList, cIndex, svgArr, svgindex);
            self.todoList = '';
            if (svgindex == (svgArr.length - 1)) {
                svgindex = 0;
            }
            else {
                svgindex++;
            }
            cIndex++;
            refreshList();
            selectList(ListService.lists.length - 1)
        }

        self.addItem = function (list) {
            var listNum = self.lists.indexOf(list);
            self.lists[listNum].items.push({text: self.todo, done: false, archived: false});
            self.todo = '';
        };
        self.deleteItem = function (list, item) {
            var listnum = self.lists.indexOf(list);
            self.lists[listnum].items.splice(self.lists[listnum].items.indexOf(item), 1);
        };
        self.changeToDo = function (i) {
            currentShow = i;
        };
        self.archiveItem = function (list) {
            var listnum = self.lists.indexOf(list);
            var oldTodos = self.lists[listnum].items;
            angular.forEach(oldTodos, function (todo) {
                if (todo.done) {
                    todo.archived = true;
                }
            });
        };
        self.deleteList = function (list) {
            ListService.deleteList(list);
            //$(".containers").addClass('hide');
            refreshList();
        };
        self.archiveList = function (list) {
            var listnum = self.lists.indexOf(list);
            var oldTodos = self.lists[listnum].items;
            self.lists[listnum].archived = true;
            angular.forEach(oldTodos, function (todo) {
                todo.done = true;
                todo.archived = true;
            });
        };
    }

})();
