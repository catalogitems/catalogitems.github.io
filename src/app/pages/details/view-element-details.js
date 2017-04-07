"use strict";

define(["text!pages/details/template-element-description.html"], function (template) {
    function ElementDetailsView($container, model) {
        var self = this;
        this.template = _.template(template);
        this.render = function () {
            var itemsStr = "";
            var modelForRender = _.difference(model, [_.where(model, {name: "Manufacturer"})[0], _.where(model, {name: "img1"})[0], _.where(model, {name: "img0"})[0],
                _.where(model, {name: "href"})[0], _.where(model, {name: "Model"})[0]]);
            _.each(modelForRender, function (item) {
                itemsStr += self.template({
                    name: item.name,
                    value: item.value
                });
            });
            $container.html(itemsStr);
        };
    }

    return ElementDetailsView;
});