(function () {

    angular
        .module('lists')
        .controller('ListController', [
            'listService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            ListController
        ])
        .filter('toArchived', function () {
            var output = [];
            return function (input)
            {
                output = input;
                angular.forEach(input, function (item) {
                    if (input.archived) {
                        output.push(item)
                    }
                });
                return output;
            };

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
        self.toggleList = toggleList;
        self.showContactOptions = showContactOptions;

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
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function toggleList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectList(list) {
            self.selected = angular.isNumber(list) ? $scope.lists[list] : list;
            self.toggleList();
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
            if (currentShow == 0) {
                self.selectList(null);
            }
            if (currentShow == 1) {
                self.selectList(0);
            }
            self.selectList(2);
        };
        /**
         * Show the bottom sheet
         */
        function showContactOptions($event) {
            var list = self.selected;

            return $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: './src/lists/view/contactSheet.html',
                controller: ['$mdBottomSheet', ContactPanelController],
                controllerAs: "cp",
                bindToController: true,
                targetEvent: $event
            }).then(function (clickedItem) {
                clickedItem && $log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function ContactPanelController($mdBottomSheet) {
                this.list = list;
                this.actions = [
                    {name: 'Delete', icon: 'phone', icon_url: 'assets/svg/phone.svg'},
                    {name: 'Edit', icon: 'twitter', icon_url: 'assets/svg/twitter.svg'},
                    {name: 'Archive', icon: 'fa fa-archive', icon_url: 'assets/svg/google_plus.svg'},
                ];
                this.submitContact = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

    }

})();
