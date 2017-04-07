"use strict";

define(["text!pages/home/filters/layout-template.html", "Storage", "ItemView", "FiltersView", "PublicFunctions"], function (layoutTemplate, Storage, ItemView, FiltersView, publicFunctions) {
    var NavigationView;
    NavigationView = function ($container) {
        var self = this;
        self.template = _.template(layoutTemplate);
        self.render = function () {
            $container.html(self.template);
            if (Storage.search) {
                $("#search").val(Storage.search);
            }
            new FiltersView($("#filter-list")).render();
        };
        events: {
            $("#filters").submit(function (event) {
                event.preventDefault();
                Storage.search = $("#search").val();
                if (Storage.search) {
                    var result = filterIteration(_.clone(Storage.filtersSpecial), filterProductsBySearch(Storage.fullCollection, Storage.search));
                    Storage.collectionForFilter = result;
                } else {
                    Storage.collectionForFilter = filterIteration(_.clone(Storage.filtersSpecial), Storage.fullCollection);
                }
                $(window).off("scroll");
                new ItemView($("#view")).render();
            });
        }
    };
    return NavigationView;
    }
);
