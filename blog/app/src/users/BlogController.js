(function () {

    angular
        .module('blogs')
        .controller('BlogController', [
            'blogService', '$mdSidenav', '$mdBottomSheet', '$log', '$q',
            BlogController
        ]);
    /**
     * Main Controller for the Angular Material Starter App
     * @param $scope
     * @param $mdSidenav
     * @param avatarsService
     * @constructor
     */
    function BlogController(blogService, $mdSidenav, $mdBottomSheet, $log, $q) {
        var self = this;
        var svgArr = ['svg-1', 'svg-2', 'svg-3', 'svg-4', 'svg-5'];
        var svgindex = 0;
        self.selected = null;
        self.blogs = blogService.blogs;
        self.selectBlog = selectBlog;
        self.toggleList = toggleBlogsList;
        self.showContactOptions = showContactOptions;
        self.addBlog = addBlog;
        self.refreshBlogs = refreshBlogs;
        // Load all registered users

        blogService
            .loadAllBlogs()
            .then(function (blogs) {
                self.blogs = [].concat(blogs);
                self.selected = blogs[0];
            });
        function refreshBlogs() {
            blogService
                .loadAllBlogs()
                .then(function (blogs) {
                    self.blogs = [].concat(blogs);
                    self.selected = blogs[0];
                });
        }

        // *********************************
        // Internal methods
        // *********************************

        /**
         * First hide the bottomsheet IF visible, then
         * hide or Show the 'left' sideNav area
         */
        function addBlog() {
            blogService.addBlog(svgArr, svgindex);
            refreshBlogs();
            svgindex++;
        }

        function toggleBlogsList() {
            var pending = $mdBottomSheet.hide() || $q.when(true);

            pending.then(function () {
                $mdSidenav('left').toggle();
            });
        }

        /**
         * Select the current avatars
         * @param menuId
         */
        function selectBlog(blog) {
            self.selected = angular.isNumber(blog) ? $scope.blogs[blog] : blog;
            self.toggleList();
        }

        self.countOf = function (text) {
            var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
            return s ? s.length : '';
        };
        self.upload = function (file) {
            Upload.upload({
                url: 'upload/url',
                data: {file: file, 'username': $scope.username}
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };
        /**
         * Show the bottom sheet
         */
        function showContactOptions($event) {
            var user = self.selected;

            return $mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: './src/users/view/contactSheet.html',
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
                this.user = user;
                this.actions = [
                    {name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg'},
                    {name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg'},
                    {name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg'},
                    {name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg'}
                ];
                this.submitContact = function (action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }

    }

})();
