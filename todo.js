var app = angular.module('todoApp', ['ngMaterial']);
app.controller('TodoListController', function() {
        var todoList = this;
        todoList.todos = [
            {text:'learn angular', done:true},
            {text:'build an angular app', done:false}];

        todoList.addTodo = function() {
            todoList.todos.push({text:todoList.todoText, done:false});
            todoList.todoText = '';
        };

        todoList.remaining = function() {
            var count = 0;
            angular.forEach(todoList.todos, function(todo) {
                count += todo.done ? 0 : 1;
            });
            return count;
        };

        todoList.archive = function() {
            var oldTodos = todoList.todos;
            todoList.todos = [];
            angular.forEach(oldTodos, function(todo) {
                if (!todo.done) todoList.todos.push(todo);
            });
        };
});
app.controller("LocationFormCtrl", function ($scope) {
    $scope.date = {
        post: new Date()
    };
    $scope.subject = {
        title: ''
    };
    $scope.author = {
        name: "Michael Teagle",
        url: './michael-teagle.html',
        src: 'http://www.gravatar.com/avatar/3f47c28141ef251e1e9caa51830090c1?s=250&d=mm&r=x'
    };
    $scope.message = {
        new: 'Bacon ipsum dolor amet ham hock meatball turducken, doner swine shankle kielbasa. Pig shankle beef ribs jerky sirloin. Hamburger bresaola boudin, tail shankle pork biltong meatloaf swine rump kevin flank porchetta t-bone. Corned beef brisket turducken, sirloin pork chop meatball tongue jerky tenderloin ham hock. Spare ribs short loin alcatra leberkas picanha shank bresaola ham sausage corned beef pancetta landjaeger. Venison jerky corned beef pork chop swine capicola doner biltong. Shoulder boudin sausage filet mignon shank alcatra.Andouille filet mignon turducken biltong, fatback t-bone short ribs. Turducken shankle chuck drumstick. Cow tenderloin swine, prosciutto meatball pancetta jerky beef flank. Beef ham hock bacon t-bone short ribs. Drumstick biltong hamburger meatloaf pork pancetta. Tail drumstick pork loin hamburger beef.Ribeye ball tip bacon cow boudin shank. Porchetta cupim tri-tip short ribs, tongue jowl frankfurter pork belly chuck shoulder tenderloin corned beef beef ribs short loin. Capicola bresaola kielbasa jerky meatloaf. Prosciutto alcatra jowl, ball tip flank t-bone fatback kevin spare ribs sausage pork loin sirloin beef. Flank beef ribs swine bresaola pork.T-bone strip steak venison ham hock, hamburger pancetta leberkas tail biltong chicken. Pastrami pork belly t-bone jowl brisket, tri-tip sirloin shankle corned beef tongue. Ham hock porchetta prosciutto jowl spare ribs ham. Beef ribs pig tri-tip chicken pancetta. Ball tip shank doner ribeye chuck andouille.Pork chop tail shoulder meatloaf pork loin beef. Fatback alcatra tail brisket cupim pork belly kielbasa corned beef shank. Turkey venison meatloaf kielbasa pork loin pork chop pork rump sirloin andouille salami ham hock pastrami. Tongue shankle rump ball tip, chicken t-bone pork chop pork loin jowl landjaeger beef ribs drumstick short ribs turducken. Beef ribs fatback turkey, filet mignon chuck pig t-bone ham hock short loin flank alcatra. Tri-tip filet mignon beef, biltong porchetta swine ham t-bone ball tip jowl brisket chuck doner andouille.Does your lorem ipsum text long for something a little meatier? Give our generator a try… it’s tasty!'
    };
    $scope.file = {
        name: 'None'
    };
    $scope.tags = '';
    $scope.obj = {};
    $scope.countOf = function(text) {
        var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
        return s ? s.length : '';
    };
});
app.directive("clickToTag", function () {
    var editorTemplate = '' +
        '<div class="click-to-tag">' +
        '<div ng-hide="view.editorEnabled">' +
        '{{value}} ' +
        '<md-button class="md-primary" ng-click="enableEditor()">Edit</md-button>' +
        '</div>' +
        '<div ng-show="view.editorEnabled">' +
        '<input type="text" ng-list = " " ng-trim="false" class="small-12.columns" ng-model="view.editableValue">' +
        '<md-button class="md-primary" ng-click="save()">Save</md-button>' +
        ' or ' +
        '<md-button class="md-warn" ng-click="disableEditor()">cancel</md-button>' +
        '</div>' +
        '</div>';

    return {
        restrict: "A",
        replace: true,
        template: editorTemplate,
        scope: {
            value: "=clickToTag"
        },
        link: function (scope, element, attrs) {
            scope.view = {
                editableValue: scope.value,
                editorEnabled: false
            };

            scope.enableEditor = function () {
                scope.view.editorEnabled = true;
                scope.view.editableValue = scope.value;
                setTimeout(function () {
                    element.find('input')[0].focus();
                });
            };

            scope.disableEditor = function () {
                scope.view.editorEnabled = false;
            };

            scope.save = function () {
                scope.value = scope.view.editableValue;
                scope.disableEditor();
            };

        }
    };
});
app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});
app.controller('MyController', function($scope, $mdSidenav) {
    $scope.openLeftMenu = function() {
        $mdSidenav('left').toggle();
    }});
