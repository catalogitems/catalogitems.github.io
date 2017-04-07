"use strict";
require.config({
    baseUrl: "src/app",

    paths: {
        jquery: "https://code.jquery.com/jquery-3.2.1",
        underscore: "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore",
        text: "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text",
        json: "https://cdnjs.cloudflare.com/ajax/libs/requirejs-plugins/1.0.3/json",
        ItemView: "pages/home/products/item-view",
        NavigationView: "pages/home/filters/layout-view",
        FiltersView: "pages/home/filters/filters-view",
        Route: "../../node_modules/routie-2/index",
        Storage: "utils/storage",
        PublicFunctions: "utils/public-functions"

    }
});
requirejs(["routers", "text", "json", "PublicFunctions"]);
