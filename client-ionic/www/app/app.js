'use strict';

var blog = angular.module('blog', ['ionic',
    'blog.controllers',
    'blog.directives',
    'fhcloud']);

blog.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        /*
        .state('/', {
            templateUrl: 'views/blog.html',
            controller: 'MainCtrl'
        });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/')
        */
        .state('app', {
            url: '/app',
            abstract: true,
            templateUrl: 'views/menu.html',
            controller: 'MainCtrl'
        })
        .state('app.about', {
            url: '/about',
            // Views is required as avout is a nested view defined under app
            views: {
                'menuContent': {
                    templateUrl: 'views/about.html'
                }
            }
        })
        .state('app.searchid', {
            url: '/searchid',
            views: {
                'menuContent': {
                    templateUrl: 'views/searchbyid.html'
                }
            }
        })
        .state('app.searchuser', {
            url: '/searchuser',
            views: {
                'menuContent': {
                    templateUrl: 'views/searchbyuser.html'
                }
            }
        })
        .state('app.articles', {
            url: '/articles',
            views: {
                'menuContent': {
                    templateUrl: 'views/articles.html'
                }
            }
        })
        .state('app.article', {
            url: '/article/:articleId',
            views: {
                'menuContent': {
                    templateUrl: 'views/article.html',
                    controller: 'ArticleCtrl'
                }
            }
        });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/articles')
});