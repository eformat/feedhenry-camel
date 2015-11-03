'use strict';

var blog = angular.module('blog.services', ['ngResource']);

blog.factory('articleService', function ($resource) {
    return $resource('http://localhost:5000/articles/:articleId');
})


blog.service('fhcloud', function ($q) {

    return function (cloudEndpoint, data) {
        var defer = $q.defer();

        var params = {
            path: cloudEndpoint,
            method: "GET",
            contentType: "application/json",
            data: data,
            timeout: 15000
        };

        $fh.cloud(params, defer.resolve, defer.reject);

        return defer.promise;
    };
});