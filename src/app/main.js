"use strict";
require.config({
    baseUrl: "src/app",

    paths: {
        jquery: "../../node_modules/jquery/dist/jquery",
        underscore: "../../node_modules/underscore/underscore",
        text: "../../node_modules/requirejs-text/text",
        json: "../../node_modules/requirejs-json/json",
        ItemView: "pages/home/products/item-view",
        NavigationView: "pages/home/filters/layout-view",
        FiltersView: "pages/home/filters/filters-view",
        Route: "../../node_modules/routie-2/index",
        Storage: "utils/storage",
        PublicFunctions: "utils/public-functions"

    }
});
requirejs(["routers", "text", "json", "PublicFunctions"]);
