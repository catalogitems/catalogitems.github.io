"use strict";

define(["text!pages/home/filters/filters-template.html", "text!pages/home/filters/section-filters-template.html", "Storage", "ItemView"], function (filtersTemplate, sectionFiltersTemplate, Storage, ItemView) {
    function FiltersView($container) {
        var self = this;
        this.collection = _.clone(Storage.collectionForFilter);
        var itemStr = "";
        var collectionFilters = [];
        var nameFilters = ["CPU", "Date", "Color"];
        addFilters(nameFilters);
        this.render = function () {
            _.each(collectionFilters, function (data) {
                _.each(data, function (dataFilters) {
                    if (!dataFilters.id) {
                        self.template = _.template(sectionFiltersTemplate);
                        itemStr += self.template({
                            name: dataFilters.name
                        });
                    } else {
                        self.template = _.template(filtersTemplate);
                        itemStr += self.template({
                            id: dataFilters.id,
                            name: dataFilters.name,
                            type: dataFilters.type
                        });
                    }
                });
            });
            $container.html(itemStr);
            if (Storage.filtersSpecial[0]) {
                onFilterChecked();
            }

        };
        function addFilters(type) {
            var counter = 1;
            _.each(type, function (type1) {
                var massModels = [];
                var a = _.uniq(_.map(Storage.fullCollection, function (data) {
                    return _.where(data, {name: type1})[0].value;
                }));
                if (!a[0]) {
                    return;
                }
                massModels.push({name: type1});
                a.forEach(function (element) {
                    massModels.push({id: counter, type: type1, name: element});
                    counter++;
                });
                collectionFilters.push(massModels);
            });
        }

        function onFilterChecked() {
            _.each(Storage.filtersSpecial, function (itemFilter) {
                _.each(_.filter(_.where($(".filter"), {name: itemFilter.type}), function (data) {
                    return _.contains(itemFilter.names, data.value);
                }), function (filter) {
                    $(filter).prop("checked", true);
                });
            });
        }

        events: {
            $("#filter-list").on("change", ".filter", function () {
                $(window).off("scroll");
                updateFilters(this);
                var result = filterIteration(_.clone(Storage.filtersSpecial), Storage.fullCollection);
                if (Storage.search) {
                    result = filterProductsBySearch(result, Storage.search);
                }
                Storage.collectionForFilter = result;
                new ItemView($("#view")).render();

            });
        }
    }

    return FiltersView;
});
