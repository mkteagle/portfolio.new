
(function () {
    'use strict';

    angular.module('lists')
        .service('ListService', ['$q', ListService]);

    function ListService($q) {
        var self = this;
        var cIndex = 0;
        var lists = [
            {
                name: 'ToDo List App',
                avatar: 'svg-1',
                items: [{text: "Add footer", done: false, archived: false}, {text: "Make it cool", done: true, archived: true}, {text: "Figure out how to display archived items", done: false, archived: false}, {text: "Hook up ng-storage", done: false, archived: false}],
                archived: false
            },
            {
                name: 'Portfolio Homepage',
                avatar: 'svg-2',
                items: [{text: "Add footer", done: false, archived: false}, {text: "Make it coo!!!", done: true, archived: true}, {text: "Add jquery animate property, http://demo.tutorialzine.com/2011/09/shuffle-letters-effect-jquery/", done: false, archived: false}],
                archived: false
            }
        ];
        self.lists = lists;
        self.deleteList = deleteList;
        self.addList = addList;
        self.addItem = addItem;
        self.deleteItem = deleteItem;
        self.archiveItem = archiveItem;
        self.archiveList = archiveList;
        self.unArchiveItems = unArchiveItems;

        function unArchiveItems() {
            return (angular.forEach(lists, function(item) {
                angular.forEach(item, function(todo) {
                    if (!todo.done) {
                        todo.archived = false;
                    }
                })
            }));
        }

        function addList(name, cIndex, svgArr, svgindex) {
            return (self.lists.push({index: cIndex, name: name, avatar: svgArr[svgindex], items: [], archived: false
            }));
        }
        function deleteList(list) {
            return (self.lists.splice(self.lists.indexOf(list), 1));
        }
        function addItem(index, item) {
            return (self.lists[index].items.push({text: item, done: false, archived: false}));
        }
        function deleteItem(index, item) {
            return (self.lists[index].items.splice(self.lists[index].items.indexOf(item), 1));
        }
        function archiveItem(item) {
            return (angular.forEach(item, function (todo) {
                if (todo.done) {
                    todo.archived = true;
                }
            }));
        }
        function archiveList(index, item) {
            return (self.lists[index].archived = true, angular.forEach(item, function (todo) {
                todo.done = true;
                todo.archived = true;
            }));
        }
        // Promise-based API
        return {
            addList: addList,
            deleteList: deleteList,
            addItem: addItem,
            deleteItem: deleteItem,
            archiveItem: archiveItem,
            archiveList: archiveList,
            unArchiveItems: unArchiveItems,
            loadAllLists: function () {
                // Simulate async nature of real remote calls
                return $q.when(lists);
            }
        };
    }

})();
