"use strict";

define(["text!pages/home/products/item-template.html", "Storage"], function (listItemTemplate, Storage) {
    var ItemView;
    ItemView = function ($container) {
        var self = this;
        this.collection = Storage.collectionForFilter.slice(0, 10);
        this.template = _.template(listItemTemplate);
        this.render = function () {
            window.scrollTo(0, 0)
            var itemsStr = "";
            _.each(self.collection, function (item) {
                itemsStr += self.templateModel(item);
            });
            $container.html(itemsStr);

        };
        events: {
            $(window).on("scroll", function () {
                if ($(window).scrollTop() === $(document).height() - $(window).height()) {
                    if (self.collection.length < Storage.collectionForFilter.length) {
                        var addCollection = Storage.collectionForFilter.slice(self.collection.length, self.collection.length + 10);
                        self.collection = self.collection.concat(addCollection);
                        var addElements = document.createElement("div");
                        var addItemStr = "";
                        _.each(addCollection, function (item) {
                            addItemStr += self.templateModel(item);
                        });
                        $(addElements).html(addItemStr);
                        $container[0].appendChild(addElements);
                    }
                }
            });
        }
        this.templateModel = function (item) {
            var dataModel = {
                price: _.where(item, {name: "Price"})[0],
                model: _.where(item, {name: "Model"})[0],
                cpu: _.where(item, {name: "CPU"})[0],
                manufacturer: _.where(item, {name: "Manufacturer"})[0],
                modelCpu: _.where(item, {name: "Model CPU"})[0],
                screenResolution: _.where(item, {name: "Screen Resolution"})[0],
                img0: _.where(item, {name: "img0"})[0],
                href: _.where(item, {name: "href"})[0]
            };
            return self.template({
                price: (dataModel.price) ? dataModel.price.value : dataModel.price,
                model: (dataModel.model) ? dataModel.model.value : "no Model",
                cpu: (dataModel.cpu) ? dataModel.cpu.value : "no CPU",
                manufacturer: (dataModel.manufacturer) ? dataModel.manufacturer.value : "no manufacturer",
                modelCPU: (dataModel.modelCpu) ? dataModel.modelCpu.value : " ",
                screenResolution: (dataModel.screenResolution) ? dataModel.screenResolution.value : " ",
                img0: (dataModel.img0) ? dataModel.img0.value : "no image",
                href: dataModel.href.value
            });
        };
    };
    return ItemView;
});
