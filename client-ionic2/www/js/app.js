angular.module('blog', ['ionic', 'blog.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider,$urlRouterProvider,$ionicConfigProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'ArticlesCtrl'
      })
      .state('app.about', {
        url: '/about',
        templateUrl: 'templates/about.html'
      })
      .state('app.searchid', {
        url: '/searchid',
        views: {
          'menuContent': {
            templateUrl: 'templates/searchbyid.html'
          }
        }
      })
      .state('app.searchuser', {
        url: '/searchuser',
        views: {
          'menuContent': {
            templateUrl: 'templates/searchbyuser.html'
          }
        }
      })
      .state('app.articles', {
        url: '/articles',
        views: {
          'menuContent': {
            templateUrl: 'templates/articles.html',
            controller: 'ArticlesCtrl'
          }
        }
      })
      .state('app.article', {
        url: '/article/:articleId',
        views: {
          'menuContent': {
            templateUrl: 'templates/article.html',
            controller: 'ArticleCtrl'
          }
        }
      });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/articles')
  })

/* Controllers */
angular.module('blog.controllers', ['backend.services'])

  .controller('ArticlesCtrl', function ($scope, $ionicModal, articleService, $timeout) {
    $scope.articles = articleService.query();

    // Create our modal
    $ionicModal.fromTemplateUrl('templates/new-article.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });

    $scope.addArticle = function(a) {
      $scope.articles.push({id: a.id, title: a.title, description: a.description, date: a.date});
      $timeout(function() {
        articleService.save(a);
        $scope.modal.hide();
      });
    };
  })

  .controller('ArticleCtrl', function ($scope, articleService, $stateParams) {
    $scope.article = articleService.get({articleId: $stateParams.articleId});
  });

/* Service to fetch REST endpoint */
angular.module('backend.services', ['ngResource'])

  .factory('articleService', function ($resource) {
    return $resource('http://localhost:5000/articles/:articleId');
  });

