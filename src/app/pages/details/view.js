"use strict";

define(["./view-element-details", "text!pages/details/template.html"], function (ElementDetails, template) {
    function DetailsView($container, model) {
        $(window).off("scroll");
        let self = this;
        self.template = _.template(template);
        self.render = function () {
            window.scrollTo(0, 0);
            $container.html(template);
            $container.html(self.template({
                img1: _.where(model, {name: "img1"})[0].value,
                manufacturer: _.where(model, {name: "Manufacturer"})[0].value,
                model: _.where(model, {name: "Model"})[0].value,
                cpu: _.where(model, {name: "CPU"})[0].value,
                modelCPU: _.where(model, {name: "Model CPU"})[0].value,
                core: _.where(model, {name: "Core"})[0].value,
                type: _.where(model, {name: "Type"})[0].value,
                diagonal: _.where(model, {name: "Diagonal"})[0].value,
                typeRAM: _.where(model, {name: "Type RAM"})[0].value,
                ram: _.where(model, {name: "RAM"})[0].value
            }));
            new ElementDetails($("#details"), model).render();
        };
    }

    return DetailsView;
});