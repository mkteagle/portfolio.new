
(function () {
    'use strict';

    angular.module('lists')
        .service('ListService', ['$q', ListService]);

    /**
     * Lists DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function ListService($q) {
        var self = this;
        var cIndex = 0;
        var lists = [
            {
                index: 0,
                name: 'List 1',
                avatar: 'svg-1',
                items: [],
                archived: false
            }
        ];
        self.lists = lists;
        self.deleteList = deleteList;
        self.addList = addList;

        function addList(name, cIndex, svgArr, svgindex) {
            return (self.lists.push({index: cIndex, name: name, avatar: svgArr[svgindex], items: [], archived: false
            }));
        }
        function deleteList(list) {
            return (self.lists.splice(self.lists.indexOf(list), 1));
        }
        // Promise-based API
        return {
            addList: addList,
            deleteList: deleteList,
            loadAllLists: function () {
                // Simulate async nature of real remote calls
                return $q.when(lists);
            }
        };
    }

})();
