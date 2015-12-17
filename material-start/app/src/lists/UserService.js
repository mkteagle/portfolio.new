(function () {
    'use strict';

    angular.module('lists')
        .service('listService', ['$q', ListService]);

    /**
     * Users DataService
     * Uses embedded, hard-coded data model; acts asynchronously to simulate
     * remote data service call(s).
     *
     * @returns {{loadAll: Function}}
     * @constructor
     */
    function ListService($q) {
        var lists = [
            //{
            //    //index: 0,
            //    //name: 'List 1',
            //    //avatar: 'svg-1',
            //    //items: [{"item": 0, "text": "be cool", "done": true},
            //    //    {"item": 1, "text": "be the man", "done": false},
            //    //    {"item": 2, "text": "something", "done": false},
            //    //    {"item": 3, "text": "another todo", "done": true}]
            //},
            {
                index: 0,
                name: 'List 1',
                avatar: 'svg-2',
                items: []
                    //[{"item": 0, "text": "be cool", "done": true},
                    //{"item": 1, "text": "be the man", "done": false},
                    //{"item": 2, "text": "something", "done": false},
                    //{"item": 3, "text": "another todo", "done": true}]
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
