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

  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controler: 'BlogCtrl'

      })
      .state('app.about', {
        url: '/about',
        views: {
          'menuContent': {
            templateUrl: 'templates/about.html'
          }
        }
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

/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
  .factory('Projects', function () {
    return {
      all: function () {
        var projectString = window.localStorage['projects'];
        if (projectString) {
          return angular.fromJson(projectString);
        }
        return [];
      },
      save: function (projects) {
        window.localStorage['projects'] = angular.toJson(projects);
      },
      newProject: function (projectTitle) {
        // Add a new project
        return {
          title: projectTitle,
          tasks: []
        };
      },
      getLastActiveIndex: function () {
        return parseInt(window.localStorage['lastActiveProject']) || 0;
      },
      setLastActiveIndex: function (index) {
        window.localStorage['lastActiveProject'] = index;
      }
    }
  });

angular.module('blog.controllers', ['backend.services'])

  .controller('BlogCtrl', function ($scope, $ionicModal, $timeout, Projects, $ionicSideMenuDelegate) {

    // Load or initialize projects
    $scope.projects = Projects.all();

    // Grab the last active, or the first project
    $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

    /*

     // A utility function for creating a new project
     // with the given projectTitle
     var createProject = function (projectTitle) {
     var newProject = Projects.newProject(projectTitle);
     $scope.projects.push(newProject);
     Projects.save($scope.projects);
     $scope.selectProject(newProject, $scope.projects.length - 1);
     }

     // Called to create a new project
     $scope.newProject = function () {
     var projectTitle = prompt('Project name');
     if (projectTitle) {
     createProject(projectTitle);
     }
     };

     // Called to select the given project
     $scope.selectProject = function (project, index) {
     $scope.activeProject = project;
     Projects.setLastActiveIndex(index);
     $ionicSideMenuDelegate.toggleLeft(false);
     };*/

    // Create our modal
    $ionicModal.fromTemplateUrl('templates/new-article.html', function (modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope
    });

    $scope.createArticle = function (task) {
      if (!$scope.activeProject || !task) {
        return;
      }
      $scope.activeProject.tasks.push({
        title: task.title
      });
      $scope.taskModal.hide();

      // Inefficient, but save all the projects
      Projects.save($scope.projects);

      task.title = "";
    };

    $scope.newArticle = function () {
      $scope.taskModal.show();
    };

    $scope.closeNewArticle = function () {
      $scope.taskModal.hide();
    }
  })

  .controller('ArticlesCtrl', function ($scope, articleService) {
    $scope.articles = articleService.query();
  })

  .controller('ArticleCtrl', function ($scope, articleService, $stateParams) {
    $scope.article = articleService.get({articleId: $stateParams.articleId});
  });

/* Service to fetch REST endpoint */
angular.module('backend.services', ['ngResource'])

  .factory('articleService', function ($resource) {
    return $resource('http://localhost:5000/articles/:articleId');
  });

