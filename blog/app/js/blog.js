$(function() {

    Parse.$ = jQuery;

    // Replace this line with the one on your Quickstart Guide Page
    Parse.initialize("TcRqvtLH8rAVZ9GReLX34zqgTixMehmFGDJvKqub", "TtwR2mmaV6P1Le9YXwnOPb12cjewfoD6YYdOCmzY");

    var Blog = Parse.Object.extend("Blog");
    // Main Blog App
    var BlogApp = new (Parse.View.extend({

        Models: {},
        Collections: {},
        Views: {},
        nodes: {},
        fn: {},

        template: Handlebars.compile($('#master-tpl').html()),

        render: function() {
            this.$el.html(this.template());
        },

        start: function() {
            this.render();
            this.$container = this.$el.find('.main-container');
            this.$sidebar = this.$el.find('.blog-sidebar');
            this.$nav = this.$el.find('.blog-nav-item');
            var router = new this.Router;
            router.start();
            this.fn.getSidebar();
        }

    }))({el: document.body});
    var blogs = new Blogs();

    blogs.fetch({
        success: function(blogs) {
            console.log(blogs);
        },
        error: function(blogs, error) {
            console.log(error);
        }
    });

});
