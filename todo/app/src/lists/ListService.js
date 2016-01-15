
(function () {
    'use strict';

    angular.module('listService', ['ngMaterial', 'navController', 'ngStorage'])
        .service('ListService', ListService);

    ListService.$inject = ['$localStorage'];

    function ListService($localStorage) {
        var self = this;
        self.lists = $localStorage.lists ? $localStorage.lists : [];
        self.deleteList = deleteList;
        self.addList = addList;
        self.addItem = addItem;
        self.deleteItem = deleteItem;
        self.archiveItem = archiveItem;
        self.archiveList = archiveList;
        self.unArchiveItems = unArchiveItems;
        self.storage = storage;

        function storage () {
            $localStorage.lists = self.lists;
        }

        function unArchiveItems() {
            angular.forEach(self.lists, function(item) {
                angular.forEach(item.items, function(todo) {
                    if (todo.done) {
                        todo.archived = false;
                        todo.done = false;
                    }
                })
            });
            storage();
        }

        function addList(name, cIndex, svgArr, svgindex) {
            self.lists.push({index: cIndex, name: name, avatar: svgArr[svgindex], items: [], archived: false
            });
            storage();
        }
        function deleteList(list) {
            self.lists.splice(self.lists.indexOf(list), 1);
            storage();
        }
        function addItem(index, item) {
            self.lists[index].items.push({text: item, done: false, archived: false});
            storage();
        }
        function deleteItem(index, item) {
            self.lists[index].items.splice(self.lists[index].items.indexOf(item), 1);
            storage();
        }
        function archiveItem(item) {
            angular.forEach(item, function (todo) {
                if (todo.done) {
                    todo.archived = true;
                }
            });
            storage();
        }
        function archiveList(item) {
           angular.forEach(item, function (todo) {
                todo.done = true;
                todo.archived = true;
            });
            storage();
        }
    }

})();
