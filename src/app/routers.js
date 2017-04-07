"use strict";

define(["jquery", "underscore", "Route", "./pages/layout-view", "./pages/details/view", "json!../data/notebook.json", "Storage"], function ($, _, Route, LayoutView, DetailsView, collection, Storage) {
    Storage.fullCollection = collection;
    Storage.collectionForFilter = collection;
    Storage.collectionForSearch = collection.slice(0, 10);
    Storage.collection = Storage.collectionForSearch;
    new Route({
        "": function home() {
            new LayoutView($("#content")).render();
        },
        "notebook/:item": function notebook(item) {
            this.model = Storage.fullCollection.filter(function (model) {
                return (_.where(model, {name: "href"})[0].value).match(new RegExp(item));
            })[0];
            new DetailsView($("#content"), this.model).render();
        }
    });
});
