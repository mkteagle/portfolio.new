
(function () {
    'use strict';

    angular.module('lists')
        .service('listService', ['$q', ListService]);

    /**
     * Lists DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function ListService($q) {
        var lists = [
           {
                index: 0,
                name: 'List 1',
                avatar: 'svg-1',
                items: [],
                archived: false
            }
        ];

        // Promise-based API
        return {
            loadAllLists: function () {
                // Simulate async nature of real remote calls
                return $q.when(lists);
            }
        };
    }

})();
