(function () {

    angular
        .module('lists')
        .controller('ListController', [
            'ListService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            ListController
        ])

    function ListController(ListService, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        var cIndex = 1;
        var svgindex = 2;
        var svgArr = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
        self.lists = ListService.lists;
        self.addList = addList;
        self.toggleList = toggleList;
        self.unArchiveItems = unArchiveItems;

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
        function unArchiveItems() {
            ListService.unArchiveItems();
        }
        function selectList(list) {
            self.selected = angular.isNumber(list) ? $scope.lists[list] : list;
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
            selectList(indexOf(ListService.lists.length - 1));
        }

        self.addItem = function (list) {
            var listNum = self.lists.indexOf(list);
            ListService.addItem(listNum, self.todo);
            self.todo = '';
        };
        self.deleteItem = function (list, item) {
            var listnum = self.lists.indexOf(list);
            ListService.deleteItem(listnum, item);
        };
        self.archiveItem = function (list) {
            var listnum = self.lists.indexOf(list);
            var oldTodos = self.lists[listnum].items;
            ListService.archiveItem(oldTodos);
        };
        self.deleteList = function (list) {
            ListService.deleteList(list);
            refreshList();
        };
        self.archiveList = function (list) {
            var listnum = self.lists.indexOf(list);
            var oldTodos = self.lists[listnum].items;
            ListService.archiveList(listnum, oldTodos);
        };
    }

})();
