define(["Storage"], function (Storage) {
    this.filterProductsBySearch = function (collection, search) {
        return collection.filter(function (model) {
            return (_.where(model, {name: "Manufacturer"})[0].value + " " + _.where(model, {name: "Model"})[0].value).match(new RegExp(search, "i"));
        });
    };
    this.updateFilters = function (self) {
        var filterType = self.name;
        var filterName = self.value;
        var searchResult = _.findWhere(Storage.filtersSpecial, {type: filterType});
        if (!searchResult) {
            Storage.filtersSpecial.push({type: filterType, names: [filterName]});
        } else if (!_.contains(searchResult.names, filterName)) {
            searchResult.names.push(filterName);
        } else {
            searchResult.names.splice(searchResult.names.indexOf(filterName), 1);
            if (searchResult.names.length === 0) {
                Storage.filtersSpecial.splice(Storage.filtersSpecial.indexOf(searchResult), 1);
            }
        }
    };
    this.filterIteration = function filterIteration(filters, collection) {
        if (!collection.length) {
            return [];
        }
        if (!filters.length) {
            return collection;
        }
        var firstFilter = filters.shift();
        var type = firstFilter.type;
        var names = firstFilter.names;
        collection = _.filter(collection, function (item) {
            return _.contains(names, _.where(item, {name: type})[0].value);
        });
        return filterIteration(filters, collection);
    };
});