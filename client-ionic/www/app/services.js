'use strict';

var blog = angular.module('blog.services', ['ngResource']);

blog.factory('articleService', function ($resource) {
        return $resource('http://localhost:5000/articles/:articleId');
    });