"use strict";
define(["text!pages/layout-template.html", "ItemView", "NavigationView", "Storage"], function (template, ItemView, NavigationView, Storage) {
        var HomeView = function ($container) {
            var self = this;
            this.template = _.template(template);
            this.render = function () {
                $container.html(template);
                var itemViewContainer = $("#view");
                var navigationViewContainer = $("#filters");
                var viewItem = new ItemView(itemViewContainer).render();
                var filterView = new NavigationView(navigationViewContainer).render();
            };
        };

        return HomeView

    }
);
